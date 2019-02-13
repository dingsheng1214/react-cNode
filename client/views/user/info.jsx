import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import UserWrapper from './user'
import infoStyles from './styles/user-info-style'

const TopicItem = (({ topic, onClick }) => (
  <ListItem button>
    <Avatar src={topic.author.avatar_url} />
    <ListItemText
      onClick={onClick}
      primary={(
        <Typography
          type="span"
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {topic.title}
        </Typography>
      )}
      secondary={`最新回复：${topic.last_reply_at}`}
    />
  </ListItem>
))

TopicItem.propTypes = {
  topic: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

@inject(stores => ({
  user: stores.appState.user,
  appState: stores.appState,
})) @observer
class UserInfo extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  // 获取数据
  componentWillMount() {
    const { user, appState } = this.props
    console.log('willMount', user);
    const { router } = this.context
    if (!user.isLogin) {
      router.history.push({
        pathname: '/user/login',
      })
    } else {
      appState.getUserDetail()
      appState.getCollections()
    }
  }

  // 话题点击
  handleTopicClick(id) {
    const { router } = this.context
    router.history.push({
      pathname: `/detail/${id}`,
    })
  }

  render() {
    const { classes, user } = this.props
    const { recent_topics: topics, recent_replies: replies } = user.detail
    const collections = user.collections.list

    return (
      <UserWrapper>
        <div className={classes.root}>
          <Grid container spacing={16} align="stretch">
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>最近发布的话题</span>
                </Typography>
                <List>
                  {
                    topics.length > 0
                      ? topics.map(topic => (
                        <TopicItem
                          topic={topic}
                          key={topic.id}
                          onClick={() => this.handleTopicClick(topic.id)}
                        />
                      ))
                      : (
                        <Typography align="center">
                        最近没有发布过话题
                        </Typography>
                      )
                  }
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>新的回复</span>
                </Typography>
                <List>
                  {
                    replies.length > 0
                      ? replies.map(topic => (
                        <TopicItem
                          topic={topic}
                          key={topic.id}
                          onClick={() => this.handleTopicClick(topic.id)}
                        />
                      ))
                      : (
                        <Typography align="center">
                        最近没有新的回复
                        </Typography>
                      )
                  }
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <Typography className={classes.partTitle}>
                  <span>收藏的话题</span>
                </Typography>
                <List>
                  {
                    collections.length > 0
                      ? collections.map(topic => (
                        <TopicItem
                          topic={topic}
                          key={topic.id}
                          onClick={() => this.handleTopicClick(topic.id)}
                        />
                      ))
                      : (
                        <Typography align="center">
                          还么有收藏话题哦
                        </Typography>
                      )
                  }
                </List>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </UserWrapper>
    )
  }
}

UserInfo.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(infoStyles)(UserInfo)
