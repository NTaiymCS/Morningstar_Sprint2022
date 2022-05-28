const AWS = require('aws-sdk');

const config = require('../config/settings');
const { invoke } = require('./util');

const lambda = new AWS.Lambda({
  apiVersion: config.version.lambda,
});

const { lambda: { FunctionName } } = config;

const env = process.argv[2];

/*
    if env is "dev", we are publishing a new version, then pointing the "qa"
    alias to that latest published version.

    if env is "qa", we are adjusting the "uat" alias to point to the current
    "qa" version; likewise, if env is "uat", we are adjusting the "prd" alias
    to point to the current "uat" version. "prd" is not a valid target.
*/

function createOrUpdateAlias({ FunctionName: name, FunctionVersion, Name }) {
  return new Promise((resolve, reject) => {
    Promise
      .resolve({
        client: lambda,
        method: 'getAlias',
        params: {
          FunctionName: name,
          Name,
        },
      })
      .then(invoke)
    // if found, update the existing alias
      .then(() => ({
        client: lambda,
        method: 'updateAlias',
        params: {
          FunctionName: name,
          FunctionVersion,
          Name,
        },
      }))
      .catch(({ message, statusCode }) => {
        if (statusCode === 404) {
          // if the alias was not found, proceed to create
          return {
            client: lambda,
            method: 'createAlias',
            params: {
              FunctionName: name,
              FunctionVersion,
              Name,
            },
          };
        }
        // otherwise report the error
        return reject(message);
      })
      .then(invoke)
      .then(resolve)
      .catch(reject);
  });
}

let promised;

if (env === 'dev') {
  promised = Promise
    .resolve({
      client: lambda,
      method: 'publishVersion',
      params: {
        FunctionName,
      },
    })
    .then(invoke)
    .then(({ Version: FunctionVersion }) => ({
      FunctionName,
      FunctionVersion,
      Name: 'qa',
    }))
    .then(createOrUpdateAlias);
} else if (env === 'qa' || env === 'uat') {
  promised = Promise
    .resolve({
      client: lambda,
      method: 'getAlias',
      params: {
        FunctionName,
        Name: env,
      },
    })
    .then(invoke)
    .then(({ FunctionVersion }) => ({
      FunctionName,
      FunctionVersion,
      // promote qa to to uat to prd
      Name: env === 'qa' ? 'uat' : 'prd',
    }))
    .then(createOrUpdateAlias);
} else {
  throw new Error(`
a valid environment target (one of "dev", "qa", or "uat") must be specified
    `);
}

promised
  /* eslint-disable-next-line no-console */
  .then(() => console.log('success!'))
  /* eslint-disable-next-line no-console */
  .catch(console.log);
