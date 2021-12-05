const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: './src/ezfft.ts',
  devtool: 'inline-source-map',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'package.json' },
        { from: 'README.md' },
        { from: 'LICENSE' },
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  experiments: { outputModule: true },
  output: {
    filename: 'ezfft.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'commonjs-module'
    }
  },
};