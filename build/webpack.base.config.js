var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');   // 处理html
var webpack = require('webpack');


module.exports = {
  context: path.resolve(__dirname, '../'),

  entry: {   // 打包入口文件
  	'index': './src/script/index.js',
    'a': './src/script/a.js'
  },

  output: {
    path: path.resolve(__dirname, '../dist'),   // 打包好的文件放在
    // publicPath: 'http://emloxe.github.io',  //  将script中src变为绝对定位
    filename: './js/[name]-[chunkhash].js'   // 打包好的文件名叫什么，指定name会将所有的js文件打包到该名称下，最好写为`[name].js`
  },


  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),    // 指定模板的位置
      inject: false,   // 生成的js引入在main的'head'
                        //传入false则不引入生成的js,可以在html中写<script src="<%= htmlWebpackPlugin.files.chunks.main.entry"></script> 这样也可以获取到main.js 的文件
      chunks: ['index'],    // 需要哪个js就写哪个
      minify: {     // 压缩
        removeComments: true,    // 删除注释
        collapseInlineTagWhitespace: true     // 删除空格
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
    loaders: [
      {
        test: /\.js$/,    // 处理js文件
        loader: 'babel-loader',
        exclude: [    // loader排除范围
           './node_modules'
        ],   
        include: [   // loader处理范围，加上这个参数，打包速度回快很多
          './src/script'
        ],    
        query: {
          presets: ['latest ']   // 指定版本
        }
      },
      {
        test: /\.css$/,    // 处理css文件
        use: [
          {loader: "style-loader"},  // style-loader将在html页面中添加style标签
          {loader: "css-loader", options: { importLoaders: 1 }},
          {loader: "postcss-loader"}  // postercss-loader对less文件进行转义 // importLoaders=1 在css文件中import引用的css 进行postcss-loader处理
        ], 

         exclude: [    // loader排除范围
          './node_modules'
        ],   
        include: [   // loader处理范围，加上这个参数，打包速度回快很多
          './src/style'
        ]
      },
      {
        test: /\.less$/,    // 处理less文件 

        use: [
          {loader: "style-loader"},
          {loader: "css-loader", options: { importLoaders: 1 }},
          {loader: "postcss-loader"},
          {loader: "less-loader"}
        ],
        exclude: [    // loader排除范围
          './node_modules'
        ],  
        include: [   // loader处理范围，加上这个参数，打包速度回快很多
          './src/style'
        ]
      }


    ]
  }

}