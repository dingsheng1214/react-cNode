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
import marked from 'marked'
import Container from '../layout/container'
import styles from './style'
import { tabs } from '../../util/constant'

@inject(stores => (
  {
    topicStore: stores.topicStore,
  }
)) @observer
class TopicDetail extends React.Component {
  componentDidMount() {
    this.getTopicDetail()
  }

  // 获取话题 ID
  getTopicId() {
    const { match } = this.props
    return match.params.id
  }

  // 根据id 查询话题详情
  getTopicDetail() {
    const { topicStore } = this.props
    const id = this.getTopicId()
    topicStore.getTopicDetail(id)
  }

  render() {
    const { classes, topicStore } = this.props
    const id = this.getTopicId()
    const topic = topicStore.detailMap[id]
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
              <Avatar
                alt={topic.author.loginname}
                src={topic.author.avatar_url}
                style={{ width: '30px', height: '30px' }}
                title={topic.author.loginname}
              />
              <span style={{ marginRight: '20px' }}>
                发布于:
                {topic.create_at}
              </span>
              <span style={{ marginRight: '20px' }}>
                作者:
                {topic.author.loginname}
              </span>
              <span style={{ marginRight: '20px' }}>
                {topic.visit_count}
                次浏览
              </span>
              <span style={{ marginRight: '20px' }}>
                来自:
                {tabs[topic.tab]}
              </span>
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
        </Paper>
      </Fragment>
    )
  }
}

TopicDetail.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
}

TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TopicDetail)
