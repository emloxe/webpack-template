var path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const Ex = require('extract-text-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');

const webpackConfig = merge(baseWebpackConfig,{
  output: {
    path: path.resolve(__dirname, '../dist'),   // 打包好的文件放在
    publicPath: 'http://cdn.emloxe.com/',  //  将script中src变为绝对定位
    filename: 'js/[name].[chunkhash].js'   // 打包好的文件名叫什么，指定name会将所有的js文件打包到该名称下，最好写为`[name].js`
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({   // 压缩代码
      compress: { warnings: false, drop_console: false, }
    }),
    new cleanWebpackPlugin(
      ['dist'], {
        verbose: false, dry: false, root: path.resolve(__dirname, '../') 
      } 
    ),
    new Ex('css/[name].[chunkhash].css', {
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
      {
        test: /\.less$/,    // 处理css文件
        use: Ex.extract({
          fallback: 'style-loader', 
          use:'css-loader?importLoaders=1!postcss-loader!less-loader'
        }),

        exclude: [    // loader排除范围
          '/node_modules'
        ]
      },
      {
        test: /\.css$/,    // 处理css文件
        use: Ex.extract({
          fallback: 'style-loader', 
          use:'css-loader?importLoaders=1!postcss-loader'
        }),

        exclude: [    // loader排除范围
          '/node_modules'
        ]
      }
      ]

    }
})


module.exports = webpackConfig;