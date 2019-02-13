const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')

//判断是否是开发环境
const isDev = process.env.NODE_ENV === 'development'

const config = {
    //入口
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    //出口
    output: {
        filename: '[name].[hash].js', // 文件更改后重新打包，hash值变化，从而刷新缓存
        path: path.join(__dirname, '../dist'),
        //很重要
        publicPath: '/public/',
    },
    //解析
    resolve: {
        extensions: ['.js', '.jsx'], // 自动解析确定的扩展
    },
    module: {
        rules: [
            {
                //前置(在执行编译之前去执行eslint-loader检查代码规范，有报错就不执行编译)
                enforce: 'pre',
                test: /.(js|jsx)$/,
                loader: 'eslint-loader',
                exclude: [
                    path.join(__dirname,'../node_modules')
                ]
            },
            {   //将jsx转换成 js
                test: /.jsx$/,
                loader: 'babel-loader'
            },
            {   //将ES6语法转成 低版本语法
                test: /.js$/,
                loader: 'babel-loader',
                exclude: [//排除node_modules 下的js
                    path.join(__dirname,'../node_modules')
                ]
            },
            {   // 解析 图片
              test: /\.(png|jpg|gif|svg)$/,
              loader: 'file-loader',
              options: {
                name: '[name].[ext]?[hash]'
              }
            }
        ]
    },
    plugins: [
        // 生成一个html页面，同时把所有 entry打包后的 output 文件全部注入到这个html页面
        new HTMLPlugin({
            template: path.join(__dirname, '../client/template.html')
        })
    ],
    //开发模式
    mode: 'development'
}

if(isDev){
    config.entry = [
        'react-hot-loader/patch', //设置这里
        path.join(__dirname, '../client/app.js')
    ]
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        host: '0.0.0.0',
        port: '8887',
        contentBase: path.join(__dirname, '../dist'), //告诉服务器从哪个目录中提供内容
        hot: true,//启用 webpack 的模块热替换特性
        overlay: {//当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
            errors: true
        },
        publicPath: '/public/',//webpack-dev-server打包的内容是放在内存中的，这些打包后的资源对外的的根目录就是publicPath，换句话说，这里我们设置的是打包后资源存放的位置
        historyApiFallback: {
            index: '/public/index.html'
        },
        proxy: { // client端 port为 8887， server端接口为 3333， 所以我们这里要设置 proxy代理
          '/api' : 'http://localhost:3333'
        }
    }
    config.plugins = [...config.plugins, new webpack.HotModuleReplacementPlugin() ]
}
module.exports = config
