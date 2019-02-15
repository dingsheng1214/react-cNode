import {
  observable,
  action,
  extendObservable,
  computed,
} from 'mobx'
import { topicSchema } from '../util/constant'
import { get, post } from '../util/http'

const createTopic = topic => (
  Object.assign({}, topicSchema, topic)
)

class Topic {
  constructor(data) {
    extendObservable(this, data)
  }

  @observable syncing
}

class TopicStore {
  @observable topics

  @observable details

  @observable syncing

  constructor({ topics = [], syncing = false, details = [] } = {}) {
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
    this.details = details.map(detail => new Topic(createTopic(detail)))
    this.syncing = syncing
  }

  addTopic(topic) {
    this.topics = [...this.topics, new Topic(createTopic(topic))]
  }

  addDetail(detail) {
    this.details.push(new Topic(createTopic(detail)))
  }

  @computed get detailMap() {
    return this.details.reduce((result, detail) => {
      result[detail.id] = detail
      return result
    }, {})
  }

  // 话题列表
  @action fetchTopics(tab = 'all', page = 0, limit = 20) {
    this.topics = []
    return new Promise((resolve, reject) => {
      this.syncing = true
      get('topics', {
        mdrender: false,
        tab,
        page,
        limit,
      }).then((resp) => {
        if (resp.success) {
          resp.data.forEach((topic) => {
            this.addTopic(topic)
          })
          resolve()
        } else {
          reject()
        }
        this.syncing = false
      }).catch((err) => {
        reject(err)
        this.syncing = false
      })
    })
  }

  // 话题详情
  @action getTopicDetail(id) {
    return new Promise((resolve, reject) => {
      // if (this.detailMap[id]) {
      //       //   // 添加到缓存
      //       //   resolve(this.detailMap[id])
      //       // } else {
      get(`topic/${id}`, {
        mdrender: false,
      }).then((resp) => {
        if (resp.success) {
          this.addDetail(resp.data)
          resolve()
        } else {
          reject()
        }
      }).catch((err) => {
        reject(err)
      })
      // }
    })
  }

  // 话题回复
  @action doReply(id, content, replyId) {
    // 是否是回复 其它的回复
    const postData = !replyId ? { content } : { content, reply_id: replyId }
    return new Promise((resolve, reject) => {
      post(`topic/${id}/replies`, { needAccessToken: true }, postData).then((resp) => {
        if (resp.success) {
          resolve()
        } else {
          reject()
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }

  @action createTopic(title, tab, content) {
    return new Promise((resolve, reject) => {
      post('topics', { needAccessToken: true }, {
        title, tab, content,
      })
        .then((data) => {
          if (data.success) {
            const topic = {
              title,
              tab,
              content,
              id: data.topic_id,
              create_at: Date.now(),
            }
            // this.createdTopics.push(new Topic(createTopic(topic)))
            resolve(topic)
          } else {
            reject(new Error(data.error_msg || '未知错误'))
          }
        })
        .catch((err) => {
          if (err.response) {
            reject(new Error(err.response.data.error_msg || '未知错误'))
          } else {
            reject(new Error('未知错误'))
          }
        })
    })
  }
}


const topicStore = new TopicStore()

export default topicStore
