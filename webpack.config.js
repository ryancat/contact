const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    'contact': './src/contact.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
    libraryTarget: 'umd'
  },

  devtool: 'inline-source-map',

  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: ['file-loader'],
      exclude: /node_modules/
    }]
  },

  plugins: [
    new CopyWebpackPlugin([{
      from: './src/index.html',
      to: './index.html'
    }])
  ]
}