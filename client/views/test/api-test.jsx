import React from 'react'
import axios from 'axios'

/* eslint-disable */
class TestApi extends React.Component {
  constructor() {
    super()
    this.getTopics = this.getTopics.bind(this)
    this.login = this.login.bind(this)
    this.markAll = this.markAll.bind(this)
  }

  getTopics() {
    axios.get('/api/topics')
      .then(result => {
        console.log(result)
      })
  }

  login() {
    axios.post('/api/user/login', {
      accesstoken: '123'
    }).then(result => {
      console.log(result)
    })
  }

  markAll() {
    axios.post('/api/message/mark_all?needAccessToken=true')
    .then(result => {
      console.log(result)
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.getTopics}>topics</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.markAll}>markAll</button>
      </div>
    )
  }
}

export default TestApi
