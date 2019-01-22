import {
  observable,
  action,
  extendObservable,
} from 'mobx'
import { topicSchema } from '../util/constant'
import { get } from '../util/http'

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

  @observable syncing

  constructor({ topics, syncing } = { topics: [], syncing: false }) {
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
    this.syncing = syncing
  }

  addTopic(topic) {
    this.topics = [...this.topics, new Topic(createTopic(topic))]
  }

  @action fetchTopics(tab = 'all') {
    this.topics = []
    return new Promise((resolve, reject) => {
      this.syncing = true
      get('topics', {
        mdrender: false,
        tab,
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
}


const topicStore = new TopicStore()

export default topicStore
