import React from 'react'
import {
  Route, Redirect,
} from 'react-router-dom'
import TopicList from '../views/topic-list'
import TopicDetail from '../views/topic-detail'
import ApiTest from '../views/test/api-test'
import UserLogin from '../views/user/login'
import UserInfo from '../views/user/info'

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key="index" />,
  <Route path="/list" component={TopicList} key="list" />,
  <Route path="/detail/:id" component={TopicDetail} key="detail" />,
  <Route path="/test" component={ApiTest} exact key="test" />,
  <Route path="/user/login" component={UserLogin} exact key="Login" />,
  // <Route path="/user/info" component={UserInfo} exact key="Info" />,
  <Route path="/user/info/:loginname" component={UserInfo} exact key="userInfo" />,
]
