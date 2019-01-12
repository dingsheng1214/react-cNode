const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')

const app = express()

const isDev = process.env.NODE_ENV === 'development'

app.use(favicon(path.join(__dirname, '../favicon.ico')))

/**
 * 只有在production 生产环境下 我们的项目目录下才会有打包生成的dist目录
 * 在development 开发环境下 由于使用了 webpack-dev-server， 打包后的文件 存放在内存中，所以要区分处理
 */
if (!isDev) {
  // --->production
  // 注意后面的.default, 因为我们在server-entry.js中 是 export default <App />
  const serverEntry = require('../dist/server-entry').default
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
  console.log(serverEntry)

  // 所有 /public 的url 请求的都是静态文件， 这里用到的就是 webpack的 output中的 publicPath属性
  app.use('/public', express.static(path.join(__dirname, '../dist')))

  app.get('*', (req, res) => {
    const appString = ReactSSR.renderToString(serverEntry)
    res.send(template.replace('<!--app-->', appString))
  })
} else {
  // --->development
  const devStatic = require('./util/dev-static.js')
  devStatic(app)
}

app.listen(3333, () => console.log('server is starting on port 3333'))
