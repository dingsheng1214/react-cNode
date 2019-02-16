const qiniu = require('qiniu')
const fs = require('fs')
const path = require('path')

// 上传静态资源所需的配置
const cdnConfig = require('./qiNiu.config').cdn

// 不需要上传的文件
const noNeedUploadFileList = ['index.html', 'server.ejs', 'server-entry.js']

const {
  ak, sk, bucket,
} = cdnConfig

// 创建各种上传凭证之前，我们需要定义好其中鉴权对象mac
const mac = new qiniu.auth.digest.Mac(ak, sk)

const doUpload = (key, file) => {

  // 创建上传凭证token
  const options = {
    scope: bucket + ':' + key,
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)

  // 服务端直传
  /*
  * 七牛存储支持空间创建在不同的机房，
  * 在使用七牛的 Node.js SDK 中的FormUploader和ResumeUploader上传文件之前，
  * 必须要构建一个上传用的config对象，在该对象中，可以指定空间对应的zone以及其他的一些影响上传的参数
  * */
  const config = new qiniu.conf.Config()
  config.zone = qiniu.zone.Zone_z0 //z0代表 华东机房
  const formUploader = new qiniu.form_up.FormUploader(config)
  const putExtra = new qiniu.form_up.PutExtra()

  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, file, putExtra, (err, body, info) => {
      if (err) {
        return reject(err)
      }
      if (info.statusCode === 200) {
        resolve(body)
      } else {
        reject(body)
      }
    })
  })
}

// webpack打包后生成的 dist 目录下的文件
const files = fs.readdirSync(path.join(__dirname, '../dist'))

// 上传需要上传的文件至 七牛云 CDN
const uploads = files.map(file => {
  if (noNeedUploadFileList.indexOf(file) === -1) {
    return doUpload(
      file,
      path.join(__dirname, '../dist', file)
    )
  } else {
    return Promise.resolve('no need upload file ' + file)
  }
})


Promise.all(uploads).then(resps => {
  console.log('upload success:', resps)
}).catch(errs => {
  console.log('upload fail:', errs)
  // process.exit(0)
})
