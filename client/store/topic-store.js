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
      console.log(result)
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
    console.log('getTopicDetail');
    return new Promise((resolve, reject) => {
      // if (this.detailMap[id]) {
      //       //   // 添加到缓存
      //       //   console.log('启用缓存');
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
  @action doReply(id, content) {
    return new Promise((resolve, reject) => {
      post(`topic/${id}/replies`, { needAccessToken: true }, {
        content,
        reply_id: id,
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
  }
}


const topicStore = new TopicStore()

export default topicStore
