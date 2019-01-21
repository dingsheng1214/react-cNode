const router = require('express').Router()
const axios = require('axios')

const baseUrl = 'https://cnodejs.org/api/v1'

// 设置 login 路由
router.post('/login', (req, res, next) => {
  // 验证token的正确性
  console.log('/login 请求的token', req.body.accesstoken)
  axios.post(`${baseUrl}/accesstoken`, {
    accesstoken: req.body.accesstoken
  }).then(result => {
    if (result.status === 200 && result.data.success === true) {
      // 如果token验证通过，则把用户信息保存在session中
      req.session.user = {
        accesstoken: req.body.accesstoken,
        loginname: result.data.loginname,
        id: result.data.id,
        avatar_url: result.data.avatar_url
      }

      res.json({
        success: true,
        data: result.data
      })
    }
  }).catch(err => {
    if (err.response) {
      res.json({
        success: false,
        data: err.response.data
      })
    } else {
      // 把异常抛出去
      next(err)
    }
  })
})

module.exports = router
