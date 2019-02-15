import {
  observable,
  toJS,
  action,
} from 'mobx'
import { post, get } from '../util/http'


export default class AppState {
  @observable user = {
    isLogin: false,
    info: {},
    detail: {
      loginname: '',
      avatar_url: '',
      recent_topics: [],
      recent_replies: [],
    },
    collections: {
      syncing: false,
      list: [],
    },
  }

  // 登录
  @action login(accesstoken) {
    return new Promise((resolve, reject) => {
      post('user/login', {}, {
        accesstoken,
      }).then((resp) => {
        if (resp.success) {
          this.user.isLogin = true
          this.user.info = resp.data
          resolve(this.user.info)
        } else {
          reject(resp)
        }
      }).catch(reject)
    })
  }

  // 获取用户详情
  @action
  getUserDetail = username => new Promise((resolve, reject) => {
    get(`user/${username}`)
      .then((resp) => {
        if (resp.success) {
          this.user.detail.loginname = resp.data.loginname
          this.user.detail.avatar_url = resp.data.avatar_url
          this.user.detail.recent_replies = resp.data.recent_replies
          this.user.detail.recent_topics = resp.data.recent_topics
          resolve()
        } else {
          reject(resp.data.msg)
        }
      }).catch((err) => {
        reject(err)
      })
  })


  // 获取收藏列表
  @action
  getCollections = (username) => {
    this.user.collections.syncing = true
    return new Promise((resolve, reject) => {
      get(`topic_collect/${username}`)
        .then((resp) => {
          if (resp.success) {
            this.user.collections.list = resp.data
            resolve()
          } else {
            reject(resp.data.msg)
          }
          this.user.collections.syncing = false
        }).catch((err) => {
          reject(err)
          this.user.collections.syncing = false
        })
    })
  }

  // 收藏
  @action
  collectTopic = id => new Promise((resolve, reject) => {
    post('topic_collect/collect', { needAccessToken: true }, {
      topic_id: id,
    }).then((resp) => {
      if (resp.success) {
        resolve()
      } else {
        reject()
      }
    }).catch((err) => {
      reject(err)
    })
  })

  // 取消收藏
  @action
  unCollectTopic = id => new Promise((resolve, reject) => {
    post('topic_collect/de_collect', { needAccessToken: true }, {
      topic_id: id,
    }).then((resp) => {
      if (resp.success) {
        resolve()
      } else {
        reject()
      }
    }).catch((err) => {
      reject(err)
    })
  })

  toJson() {
    return {
      user: toJS(this.user),
    }
  }
}
