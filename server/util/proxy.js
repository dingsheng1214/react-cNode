const axios = require('axios')
const queryString = require('querystring')

const baseUrl = 'https://cnodejs.org/api/v1'

module.exports = function (req, res, next) {
  const path = req.path
  const user = req.session.user || {}
  const needAccessToken = req.query.needAccessToken

  // 如果请求需要 token 但是 user信息里没有 token 则 提示 需要登录
  if (needAccessToken && !user.accesstoken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }
  const query = Object.assign({}, req.query)
  if (query.needAccessToken) delete query.needAccessToken

  // 转发请求
  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query,
    data: queryString.stringify(Object.assign({}, req.body, { // 将 {a:'b'} 转换成 a=b
      accesstoken: user.accesstoken
    })),
    headers: { // 因为我们设置了 这种Content-Type, 所以提交的数据要按照 key1=val1&key2=val2的方式进行编码
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(result => {
    if (result.status === 200) {
      res.header({
        'Access-Control-Allow-Origin': '*'
      })
      res.send(result.data)
    } else {
      res.status(result.status).send(result.data)
    }
  }).catch(err => {
    if (err.response) {
      res.status(500).send(err.response.data)
    } else {
      res.status(500).send({
        success: false,
        msg: '未知错误'
      })
    }
  })
}
