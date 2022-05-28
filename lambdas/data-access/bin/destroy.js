const AWS = require('aws-sdk');

const config = require('../config/settings');
const { invoke } = require('./util');

const iam = new AWS.IAM({
  apiVersion: config.version.iam,
});

const lambda = new AWS.Lambda({
  apiVersion: config.version.lambda,
});

const {
  lambda: { FunctionName },
  executionRole: { AttachRolePolicies },
} = config;

const RoleName = `${config.lambda.FunctionName}-execution-role`;

Promise
  .resolve({
    client: lambda,
    method: 'deleteFunction',
    params: {
      FunctionName,
    },
  })
  .then(invoke)
  .then(() => AttachRolePolicies.map((PolicyArn) => ({
    client: iam,
    method: 'detachRolePolicy',
    params: {
      PolicyArn,
      RoleName,
    },
  })))
  .then((actions) => Promise.all(actions.map(invoke)))
  .then(() => ({
    client: iam,
    method: 'deleteRole',
    params: {
      RoleName,
    },
  }))
  .then(invoke)
  /* eslint-disable-next-line no-console */
  .then(() => console.log('success!'))
  /* eslint-disable-next-line no-console */
  .catch(console.log);
