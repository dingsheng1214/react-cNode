import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  observer,
  inject,
} from 'mobx-react'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';

import SimpleMD from 'react-simplemde-editor'
import marked from 'marked'
import highlight from 'highlightjs'
import dateFormat from 'dateformat'

import Container from '../layout/container'
import styles from './style'
import { tabs } from '../../util/constant'
import ReplyItem from './reply-item'

@inject(stores => (
  {
    topicStore: stores.topicStore,
    appState: stores.appState,
  }
)) @observer
class TopicDetail extends React.Component {
  // 通过context 获取 router
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(props) {
    super(props)
    const { appState, match } = props
    const isCollected = appState.user.collections.list.find(item => item.id === match.params.id)
    this.state = {
      isCollected,
      newReply: '',
    }
  }

  componentDidMount() {
    this.getTopicDetail()

    marked.setOptions({
      highlight(code) {
        return highlight.highlightAuto(code).value;
      },
    })
  }

  // 获取话题 ID
  getTopicId() {
    const { match } = this.props
    return match.params.id
  }

  // 根据id 查询话题详情
  getTopicDetail() {
    console.log('获取话题详情');
    const { topicStore } = this.props
    const id = this.getTopicId()
    topicStore.getTopicDetail(id)
  }

  // simpleMD 回复内容
  handleNewReplyChange = (value) => {
    this.setState({
      newReply: value,
    })
  }

  // 登录并回复
  goToLogin = () => {
    const { router } = this.context
    router.history.push({
      pathname: '/user/login',
    })
  }

  // 回复按钮
  doReply = (id) => {
    const { topicStore } = this.props
    const { newReply } = this.state
    topicStore.doReply(id, newReply).then(() => {
      this.getTopicDetail()
    }).then(() => {
      this.setState({
        newReply: '',
      })
    })
  }

  // 收藏
  handleCollect(id) {
    const { appState } = this.props
    const { isCollected } = this.state
    appState.collectTopic(id)
    this.setState({
      isCollected: !isCollected,
    })
  }

  // 取消收藏
  handleUnCollect(id) {
    const { appState } = this.props
    const { isCollected } = this.state
    appState.unCollectTopic(id)
    this.setState({
      isCollected: !isCollected,
    })
  }


  render() {
    const { isCollected, newReply } = this.state
    const { classes, topicStore, appState } = this.props
    const id = this.getTopicId()
    const topic = topicStore.detailMap[id]
    const { user } = appState
    // 加载动画
    if (!topic) {
      return <div className={classes.loading}><CircularProgress color="secondary" size={80} /></div>
    }
    return (
      <Fragment>
        <Container>
          <div className={classes.header}>

            <div className={classes.title}>
              {
                topic.top === true || topic.good === true
                  ? <span className={classes.tab}>{ topic.top === true ? '置顶' : tabs.good }</span>
                  : ''
              }
              <span>{topic.title}</span>
            </div>
            <div className={classes.changes}>
              <a href={`/user/${topic.author.loginname}`}>
                <Avatar
                  alt={topic.author.loginname}
                  src={topic.author.avatar_url}
                  style={{ width: '30px', height: '30px' }}
                  title={topic.author.loginname}
                />
              </a>
              <span>
                发布于:
                {dateFormat(topic.create_at, 'yyyy-mm-dd HH:MM:ss')}
              </span>
              <span>
                作者:
                {topic.author.loginname}
              </span>
              <span>
                {topic.visit_count}
                次浏览
              </span>
              <span>
                来自:
                {tabs[topic.tab]}
              </span>
              {
                user.isLogin ? (
                  !isCollected
                    ? (
                      <Button variant="contained" color="primary" className={classes.collectBtn} onClick={() => this.handleCollect(id)}>
                      关注
                      </Button>
                    )
                    : (
                      <Button variant="contained" color="secondary" className={classes.collectBtn} onClick={() => this.handleUnCollect(id)}>
                        取消关注
                      </Button>
                    )
                ) : null
              }
            </div>

          </div>
          <Divider />
          <section className={classes.content}>
            <p dangerouslySetInnerHTML={{ __html: marked(topic.content) }} />
          </section>

        </Container>
        <Paper className={classes.paper}>
          <div className={classes.reply_header}>
            <span>{topic.reply_count}</span>
            <span> 回复</span>
          </div>
          {
              user.isLogin ? (
                <section className={classes.replyEditor}>
                  <SimpleMD
                    onChange={this.handleNewReplyChange}
                    value={newReply}
                    options={{
                      toolbar: false, autofocus: false, spellChecker: false, placeholder: '添加您的精彩回复',
                    }}
                  />
                  <Button variant="contained" color="primary" className={classes.replyButton} onClick={() => this.doReply(id)}>回复</Button>
                </section>
              ) : null
            }
          {
            !user.isLogin && (
              <section className={classes.notLoginButton}>
                <Button variant="contained" color="secondary" onClick={this.goToLogin}>登录并回复</Button>
              </section>
            )
          }
          <List>
            { topic.replies.map((n, i) => <ReplyItem reply={n} key={n.id} index={i + 1} />) }
          </List>
        </Paper>
      </Fragment>
    )
  }
}

TopicDetail.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
}

TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TopicDetail)
