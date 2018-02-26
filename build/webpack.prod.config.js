var path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config')

const webpackConfig = merge(baseWebpackConfig,{
  output: {
    path: path.resolve(__dirname, '../dist'),   // 打包好的文件放在
    // publicPath: 'http://emloxe.github.io',  //  将script中src变为绝对定位
    filename: './js/[name]-[chunkhash].js'   // 打包好的文件名叫什么，指定name会将所有的js文件打包到该名称下，最好写为`[name].js`
  },
    module: {
      rules:[
      {
        test: /\.(png|jpg|gif|svg)$/i,    // 图片处理
        loaders: [
          'url-loader?limit=2000&name=assets/[name]-[hash:5].[ext]',
          'image-webpack'
        ],
        exclude: [    // loader排除范围
          './node_modules'
        ],  
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'asset/media/[name].[hash:7].[ext]'
        },
        exclude: [    // loader排除范围
          './node_modules'
        ],  
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name:'fonts/[name].[hash:7].[ext]'
        },
        exclude: [    // loader排除范围
          './node_modules'
        ],  
      }
      ]

    }
})


module.exports = webpackConfig;