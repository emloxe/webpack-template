var path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config')

module.exports = merge(baseWebpackConfig,{
  devServer: {
      contentBase: path.resolve(__dirname,'../dist'),
      host: 'localhost',
      compress: true,
      port: 3000
  } //  配置webpack服务

})