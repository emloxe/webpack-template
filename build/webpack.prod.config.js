const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');

const webpackConfig = merge(baseWebpackConfig,{
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist/static'),   // 打包好的文件放在
    //publicPath: 'http://cdn.emloxe.com/',  //  将script中src变为绝对定位
    filename: 'js/[name].[chunkhash].js'   // 打包好的文件名叫什么，指定name会将所有的js文件打包到该名称下，最好写为`[name].js`
  },
  plugins: [
    new UglifyJsPlugin(),
    new ExtractTextPlugin('css/[name].[chunkhash].css', {
      allChunks: true,
    })
  ],
  module: {
    rules:[
    {
      test: /\.html$/,   // 处理html中的图片
      use: {
        loader: 'html-withimg-loader'
      }
    },
    ]
  }
});

module.exports = webpackConfig;