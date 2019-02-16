import React from 'react'
import {
  Route, Redirect, Switch,
} from 'react-router-dom'
import TopicList from '../views/topic-list'
import TopicDetail from '../views/topic-detail'
import UserLogin from '../views/user/login'
import UserInfo from '../views/user/info'
import TopicCreate from '../views/topic-create'

export default () => (
  <Switch>
    <Route path="/public/index.html" render={() => <Redirect to="/index" />} exact key="index" />
    <Route path="/public" render={() => <Redirect to="/index" />} exact key="index" />
    <Route path="/" render={() => <Redirect to="/index" />} exact key="index" />
    <Route path="/index" component={TopicList} key="index" />
    <Route path="/detail/:id" component={TopicDetail} key="detail" />
    <Route path="/user/login" component={UserLogin} exact key="Login" />
    <Route path="/user/:loginname" component={UserInfo} exact key="userInfo" />
    <Route path="/topic/create" component={TopicCreate} exact key="topicCreate" />
  </Switch>
)
