const path = require('path');
const fs = require('fs-extra');
const archiver = require('archiver');
const webpack = require('webpack');
const config = require('./webpack.config');

function reject() {
  /* eslint-disable-next-line no-console */
  console.error('Build failed with errors.');
  process.exit(1);
}

process.env.NODE_ENV = 'production';
/* eslint-disable-next-line no-console */
console.log('building...\n');

webpack(config, (err, stats) => {
  const output = fs.createWriteStream(path.resolve(__dirname, '..', 'dist', 'bundle.zip'));
  const bundle = archiver('zip', {
    zlib: {
      level: 9,
    },
  });

  if (err || stats.hasErrors()) {
    reject();
  }

  process.stdout.write(`${stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
    warnings: false,
  })}\n\n`);
  /* eslint-disable-next-line no-console */
  console.log('archiving...\n');

  bundle.pipe(output);
  bundle.directory(path.resolve(__dirname, '..', 'config'), 'config');
  bundle.directory(path.resolve(__dirname, '..', 'src', 'lib', 'pug'), 'pug');
  bundle.file(path.resolve(__dirname, '..', 'dist', 'bundle.js'), {
    name: 'index.js',
  });

  bundle.finalize();
  bundle.on('warning', reject);
  bundle.on('error', reject);
  output.on('close', () => {
    /* eslint-disable-next-line no-console */
    console.log('success!\n');
    process.exit(0);
  });
});
