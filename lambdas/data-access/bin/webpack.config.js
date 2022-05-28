const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '..', 'src', 'index.js'),
  externals: ['aws-sdk'],
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                debug: true,
                useBuiltIns: 'usage',
                targets: { node: '12' },
              }],
            ],
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
  output: {
    filename: 'bundle.js',
    library: 'index',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '..', 'dist'),
  },
  target: 'node',
  resolve: {
    extensions: ['.js', '.json'],
  },
};
