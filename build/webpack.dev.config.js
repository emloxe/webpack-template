const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config')

module.exports = merge(baseWebpackConfig,{
  context: path.resolve(__dirname, '../'),
  devtool: 'inline-source-map',    // 定位到错误的位置
  devServer: {
    contentBase: path.resolve(__dirname,'../dist'),
    host: 'localhost',
    compress: true,
    port: 3000
  }, //  配置webpack服务
  module: {
    rules: [
      {
        test: /\.html$/,   // 处理图片，注意图片引用地址是否正确，否者会报 `ERROR in ./node_modules/html-webpack-plugin/lib/loader.js!` 错误 
        use: {
          loader: 'html-loader'
        }
      },
    ]
  }
})