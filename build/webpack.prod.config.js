var path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const Ex = require('extract-text-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');

const webpackConfig = merge(baseWebpackConfig,{
  output: {
    path: path.resolve(__dirname, '../dist'),   // 打包好的文件放在
    // publicPath: 'http://emloxe.github.io',  //  将script中src变为绝对定位
    filename: './js/[name].[chunkhash].js'   // 打包好的文件名叫什么，指定name会将所有的js文件打包到该名称下，最好写为`[name].js`
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
      allChunks: true
    })
  ],
    module: {
      rules:[
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
      },
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
          name: 'media/media/[name].[hash:5].[ext]'
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
          name:'fonts/[name].[hash:5].[ext]'
        },
        exclude: [    // loader排除范围
          './node_modules'
        ],  
      }
      ]

    }
})


module.exports = webpackConfig;