const express = require('express')
// const ReactSSR = require('react-dom/server')
// const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
// const queryString = require('query-string')
const session = require('express-session')

const app = express()

const morgan = require('morgan')

app.use(morgan('dev'))
// 把post提交的数据 放到 req.body上
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false, // 是否每次都重新保存会话，建议false
  saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
  secret: 'react cnode class' // 用来对session id相关的cookie进行签名
}))

app.use(favicon(path.join(__dirname, '../favicon.ico')))

app.use('/api/user', require('./util/handle-login'))
app.use('/api', require('./util/proxy'))
/**
 * 只有在production 生产环境下 我们的项目目录下才会有打包生成的dist目录
 * 在development 开发环境下 由于使用了 webpack-dev-server， 打包后的文件 存放在内存中，所以要区分处理
 */
const isDev = process.env.NODE_ENV === 'development'
if (!isDev) {
  // --->production
  // 所有 /public 的url 请求的都是静态文件， 这里用到的就是 webpack的 output中的 publicPath属性
  app.use('/public', express.static(path.join(__dirname, '../dist')))
  app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../dist', 'index.html'))
  })
} else {
  // --->development
  const devStatic = require('./util/dev-static.js')
  devStatic(app)
}

const host = process.env.host || '0.0.0.0'
const port = process.env.port || '3333'
app.listen(port, host, () => console.log('server is starting on port 3333'))
