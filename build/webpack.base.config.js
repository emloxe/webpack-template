const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin'); // 处理html
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: { // 打包入口文件
    'common': './src/script/common.js',
  	'index': './src/script/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist/static'), // 打包好的文件放在
    // publicPath: 'http://emloxe.github.io', //  将script中src变为绝对定位
    filename: 'js/[name].js'   // 打包好的文件名叫什么，指定name会将所有的js文件打包到该名称下，最好写为`[name].js`
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'), // 指定模板的位置
      inject: 'body', // 生成的js引入在main的'head'
                      //传入false则不引入生成的js,可以在html中写<script src="<%= htmlWebpackPlugin.files.chunks.main.entry"></script> 这样也可以获取到main.js 的文件
      chunks: ['common', 'index'],    // 需要哪个js就写哪个
      minify: { // 压缩
        removeComments: true, // 删除注释
        collapseInlineTagWhitespace: true // 删除空格
      }   
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('autoprefixer')({    // 浏览器加前缀
           /*...options*/
            broswers: ['last 5 versions']
          })
        ]
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,    // 处理js文件
        use: [
  		    {
            loader: 'babel-loader'
          },
  		    {
            loader: 'source-map-loader'
          }
		    ],
		    enforce: 'pre',
        exclude: [    // loader排除范围  todo 范围路径有问题
          path.resolve(__dirname, '../node_modules/')
        ]
      },
      {
        test: /\.css$/,    // 处理css文件
        use: [
          {loader: "style-loader"},  // style-loader将在html页面中添加style标签
          {loader: "css-loader", options: { importLoaders: 1 }},
          {loader: "postcss-loader"}  // importLoaders=1 在css文件中import引用的css 进行postcss-loader处理
        ], 
        exclude: [    // loader排除范围
          path.resolve(__dirname,'../node_modules')
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
          path.resolve(__dirname,'../node_modules')
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,    // 图片处理
        loaders: [
          'url-loader?limit=2000&name=assets/images/[name]-[hash:5].[ext]',
          'image-webpack-loader'
        ],
        exclude: [    // loader排除范围
          path.resolve(__dirname, '../node_modules/')
        ],  
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:5].[ext]'
        },
        exclude: [    // loader排除范围
          path.resolve(__dirname, '../node_modules/')
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
          path.resolve(__dirname, '../node_modules/')
        ],  
      }
    ]
  }
}