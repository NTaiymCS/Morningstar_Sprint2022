const AWS = require('aws-sdk');
const fs = require('fs-extra');
const path = require('path');

const config = require('../config/settings');
const { invoke, retry } = require('./util');

const iam = new AWS.IAM({
  apiVersion: config.version.iam,
});

const lambda = new AWS.Lambda({
  apiVersion: config.version.lambda,
});

const {
  executionRole: { AssumeRolePolicy, AttachRolePolicies },
} = config;

const RoleName = `${config.lambda.FunctionName}-execution-role`;

const AssumeRolePolicyDocument = JSON.stringify(AssumeRolePolicy);

const bundlePath = path.resolve(__dirname, '..', 'dist', 'bundle.zip');

const outputPath = path.resolve(__dirname, '..', 'config', 'output.json');

Promise
  .resolve({
    client: iam,
    method: 'getRole',
    params: {
      RoleName,
    },
  })
  .then(invoke)
  .catch(({ message, statusCode }) => {
    if (statusCode === 404) {
      // if the role was not found, proceed to create
      return invoke({
        client: iam,
        method: 'createRole',
        params: {
          AssumeRolePolicyDocument,
          Path: '/System/',
          RoleName,
        },
      });
    }
    // otherwise report the error
    return Promise.reject(message);
  })
  .then(({ Role: { Arn } }) => {
    config.lambda.Role = Arn;

    return AttachRolePolicies.map((PolicyArn) => ({
      client: iam,
      method: 'attachRolePolicy',
      params: {
        PolicyArn,
        RoleName,
      },
    }));
  })
  .then((actions) => Promise.all(actions.map(invoke)))
  .then(() => fs.readFile(bundlePath))
  .then((data) => {
    config.lambda.Code = {
      ZipFile: Buffer.from(data, 'binary'),
    };

    return {
      client: lambda,
      method: 'createFunction',
      params: config.lambda,
    };
  })
/*
        There's a race condition when creating IAM roles wherein the role
        may not be available in time to assign it to the lambda function.
        if this occurs the action will return an error with the message
        "The role defined for the function cannot be assumed by Lambda."

        The way we're going to deal with this is by re-trying the create
        Lambda operation at some interval until it resolves successfully.

        Arguments for retry are: thunked promise, retry-delay, retry-attempts
    */
  .then((action) => retry(invoke.bind(null, action), 3000, 5))
// write the output to a local file, then continue operations
  .then((data) => fs
    .writeFile(outputPath, JSON.stringify(data, null, '\t'))
    .then(() => data))
// create a default set of function aliases
  .then(({ FunctionName }) => ['dev', 'qa', 'uat', 'prd'].map((env) => ({
    client: lambda,
    method: 'createAlias',
    params: {
      FunctionName,
      FunctionVersion: '$LATEST',
      Name: env,
    },
  })))
  .then((actions) => Promise.all(actions.map(invoke)))
  /* eslint-disable-next-line no-console */
  .then(() => console.log('success!'))
  /* eslint-disable-next-line no-console */
  .catch(console.log);
