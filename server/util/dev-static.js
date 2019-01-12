const axios = require('axios')
const webpack = require('webpack')
const path = require('path')
const MemoryFs = require('memory-fs')
const ReactSSR = require('react-dom/server')
const proxy = require('http-proxy-middleware')

// 用于接收 bundle
let serverBundle

// server端的 webpack 配置文件
const webpackServerConfig = require('../../build/webpack.config.server')

// 如果你不向 webpack 执行函数传入回调函数，就会得到一个 webpack Compiler 实例。你可以通过它手动触发 webpack 执行器，或者是让它执行构建并监听变更
const serverCompiler = webpack(webpackServerConfig)

const mfs = new MemoryFs()
// 使用 memory-fs 替换默认的 outputFileSystem，以将文件写入到内存中，而不是写入到磁盘
serverCompiler.outputFileSystem = mfs

// 调用 watch 方法会触发 webpack 执行器，但之后会监听变更 一旦 webpack 检测到文件变更，就会重新执行编译。该方法返回一个 Watching 实例(它会暴露一个 .close(callback) 方法。调用该方法将会结束监听：)
serverCompiler.watch({
  // watchOptions 示例
  aggregateTimeout: 300,
  poll: undefined
}, (err, stats /* 以通过它获取到代码编译过程中的有用信息 */) => {
  if (err) throw err
  // 以 JSON 对象形式返回编译信息
  stats = stats.toJson()
  // 打印❌ 信息
  stats.errors.forEach(err => console.error(err))
  // 打印⚠️ 信息
  stats.warnings.forEach(warn => console.warn(warn))

  const output = webpackServerConfig.output
  // server-entry.js 打包后的 完整路径
  const bundlePath = path.join(output.path, output.filename)

  // 读取 打包后的文件，但是 返回的是 string 类型
  const bundle = mfs.readFileSync(bundlePath, 'utf8')

  // 将webpack打包后生成的字符串 转化成 模块
  const Module = module.constructor
  const m = new Module()
  m._compile(bundle, 'server-entry.js')
  serverBundle = m.exports.default
})

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    // webpack-dev-server 打包后的文件保存在 内存中 ，通过url去访问index.html
    axios.get('http://localhost:8887/public/index.html')
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

module.exports = function (app) {
  // 因为 开发环境下通过webpack-dev-server打包 不生成dist目录(保存在内存中) 所以只能将 静态文件的请求 做 代理 的 处理
  app.use('/public', proxy({
    target: 'http://localhost:8887'
  }))

  app.get('*', (req, res) => {
    getTemplate().then(template => {
      const content = ReactSSR.renderToString(serverBundle)
      res.send(template.replace('<!--app-->', content))
    })
  })
}
