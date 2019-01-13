const axios = require('axios')

const baseUrl = 'https://cnodejs.org/api/v1'

module.exports = function (req, res, next) {
  const path = req.path
  const user = req.session.user || {}
  const needAccesToken = req.query.needAccesToken

  // 如果请求需要 token 但是 user信息里没有 token 则 提示 需要登录
  if (needAccesToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }

  const query = Object.assign({}, req.query)
  if (query.needAccesToken) delete query.needAccesToken

  // 转发请求
  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query,
    data: Object.assign({}, req.body, {
      accessToken: user.needAccesToken
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(result => {
    if (result.status === 200) {
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
