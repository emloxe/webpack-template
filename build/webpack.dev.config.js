var path = require('path');
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
        test: /\.css$/,    // 处理css文件
        use: [
          {loader: "style-loader"},  // style-loader将在html页面中添加style标签
          {loader: "css-loader", options: { importLoaders: 1 }},
          {loader: "postcss-loader"}  // importLoaders=1 在css文件中import引用的css 进行postcss-loader处理
        ], 

        exclude: [    // loader排除范围
          '/node_modules'
        ]
      },
      {
        test: /\.less$/,    // 处理less文件 

        use: [
          {loader: "style-loader"},
          {loader: "css-loader", options: { importLoaders: 1 }},
          {loader: "postcss-loader"},
          {loader: "less-loader", options: {
              strictMath: true,
              noIeCompat: true
            }}
        ],
        exclude: [    // loader排除范围
          '/node_modules'
        ]
      }
    ]
  }
})