import React from 'react'
import {
  Route, Redirect,
} from 'react-router-dom'
import TopicList from '../views/topic-list'
import TopicDetail from '../views/topic-detail'

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key="index" />,
  <Route path="/list" component={TopicList} exact key="list" />,
  <Route path="/detail" component={TopicDetail} exact key="detail" />,
]
