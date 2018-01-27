var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');   // 处理html

module.exports = {

  entry: {   // 打包入口文件
  	'index': './src/script/index.js',
    'a': './src/script/a.js'
  },

  output: {
    path: './dist',   // 打包好的文件放在
    // publicPath: 'http://emloxe.github.io',  //  将script中src变为绝对定位
    filename: '/js/[name]-[chunkhash].js'   // 打包好的文件名叫什么，指定name会将所有的js文件打包到该名称下，最好写为`[name].js`
  },


  plugins: [
    new htmlWebpackPlugin({
      filename: 'main.html',
      template: 'index.html',    // 指定模板的位置
      inject: false,   // 生成的js引入在main的'head'
                        //传入false则不引入生成的js,可以在html中写<script src="<%= htmlWebpackPlugin.files.chunks.main.entry"></script> 这样也可以获取到main.js 的文件
      chunks: ['main']    // 需要哪个就写哪个
      minify: {     // 压缩
        removeComments: true,    // 删除注释
        collapseInlineTagWhitespace: true     // 删除空格
      }   
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,    // 处理js文件
        loader: 'babel-loader',
        exclude: [    // loader排除范围
          path.resolve(__dirname, 'node_modules')
        ],   
        include: [   // loader处理范围，加上这个参数，打包速度回快很多
          path.resolve(__dirname, 'app/src')
        ],    
        query: {
          presets: ['latest ']   // 指定版本
        }
      },
      {
        test: /\.css$/,    // 处理css文件
        loader: 'style-loader!css-loader?importLoaders=1!postcss-loader',  // postercss-loader对less文件进行转义，style-loader将在html页面中添加style标签
                          // importLoaders=1 在css文件中import引用的css 进行postcss-loader处理
        exclude: [    // loader排除范围
          path.resolve(__dirname, 'node_modules')
        ],   
        include: [   // loader处理范围，加上这个参数，打包速度回快很多
          path.resolve(__dirname, 'app/src')
        ]
      },
      {
        test: /\.less$/,    // 处理less文件
        loader: 'style!css!postcss!less'   // style-loader简化为了style
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,    // 图片处理
        loaders: [
          'url-loader?limit=2000&name=assets/[name]-[hash:5].[ext]',
          'image-webpack'
        ]
      }

    ]
  },

  postcss: [
    require('autoprefixer')({    // 浏览器加前缀
     /*...options*/
      broswers: ['last 5 versions']
    })
  ]

}