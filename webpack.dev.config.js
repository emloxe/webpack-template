
var htmlWebpackPlugin = require('html-webpack-plugin');   // 处理html

module.exports{

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
      inject: 'head',   // 生成的js引入在main的'head'
                        //传入false则不引入生成的js,可以在html中写<script src="<%= htmlWebpackPlugin.files.chunks.main.entry"></script> 这样也可以获取到main.js 的文件
      minify: {     // 压缩
        removeComments: true,    // 删除注释
        collapseInlineTagWhitespace: true     // 删除空格
      }   
    })
  ]

}