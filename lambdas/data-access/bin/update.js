const AWS = require('aws-sdk');
const fs = require('fs-extra');
const path = require('path');

const config = require('../config/settings');
const { invoke } = require('./util');

const lambda = new AWS.Lambda({
  apiVersion: config.version.lambda,
});

const { lambda: { FunctionName } } = config;

const bundlePath = path.resolve(__dirname, '..', 'dist', 'bundle.zip');

const outputPath = path.resolve(__dirname, '..', 'config', 'output.json');

Promise
  .resolve(fs.readFile(bundlePath))
  .then((data) => {
    // get the function code
    const ZipFile = Buffer.from(data, 'binary');
    // perform a code update
    return {
      client: lambda,
      method: 'updateFunctionCode',
      params: {
        FunctionName,
        ZipFile,
      },
    };
  })
  .then(invoke)
// perform a configuration update
  .then(() => {
    // the update operation does not accept tags, for whatever reason
    const params = { ...config.lambda };
    // so, remove them
    delete params.Tags;
    // return the update config operation
    return {
      client: lambda,
      method: 'updateFunctionConfiguration',
      params,
    };
  })
  .then(invoke)
  .then((data) => fs.writeFile(outputPath, JSON.stringify(data, null, '\t')))
  /* eslint-disable-next-line no-console */
  .then(() => console.log('success!'))
  /* eslint-disable-next-line no-console */
  .catch(console.log);
