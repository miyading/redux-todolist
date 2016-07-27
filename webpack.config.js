const webpack = require('webpack');
const _dirname = 'src/'

module.exports = {
  entry: './src/index',
  output: {
    path: _dirname,
    filename: 'static/bundle.js'
  },
  module: {
    //加载器适配
    loaders: [
      {
        //test项表示匹配的资源类型，loader或loaders项表示用来加载这种类型的资源的loader,！用来定义loader的串联关系，”-loader”是可以省略不写的，多个loader之间用“!”连接起来，但所有的加载器都需要通过npm来加载
        test: /\.js$/,
        loader: 'babel'
      }
    ]
  },
  resolve: {
    
    //绝对路径,查找module直接从这个路径开始查找
    root: '/src',
    
    //自动扩展文件后缀名,以后找require模块可以省略不写后缀名
    extensions: ['', '.js', '.jsx', '.scss'],
    
    //模块别名定义,方便后续直接用别名
    alias: {
      appAction: 'js/actions/appAction.js'
    }
  },
  
  plugins: [],
  
  externals: {}
};