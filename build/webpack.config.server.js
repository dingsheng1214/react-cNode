const path = require('path')

// 服务端渲染 webpack 配置
module.exports = {
    //打包后的文件 在哪个环境下执行 默认为 web 浏览器环境
    target: 'node',
    entry: {
        app: path.join(__dirname, '../client/server-entry.js')
    },
    output: {
        filename: 'server-entry.js', 
        path: path.join(__dirname, '../dist'),
        publicPath: '/public', 
        //nodejs的模块机制 是 commonjs
        libraryTarget: 'commonjs2'
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
            }
        ]
    },
    //开发模式
    mode: 'development',
}