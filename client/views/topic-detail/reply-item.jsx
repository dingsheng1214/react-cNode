import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import IconReply from '@material-ui/icons/Reply';
import Button from '@material-ui/core/Button';
import dateFormat from 'dateformat'
import SimpleMD from 'react-simplemde-editor'
import { inject, observer } from 'mobx-react';


import marked from 'marked'
import styles from './style'

@inject(stores => (
  {
    topicStore: stores.topicStore,
    appState: stores.appState,
  }
)) @observer
class ReplyItem extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor() {
    super()
    this.state = {
      open: false,
      newReply: '',
    }
  }

  goToUserInfo = (loginname, e) => {
    e.preventDefault()
    const { router } = this.context
    router.history.push({
      pathname: `/user/${loginname}`,
    })
  }

  toggleDrawer = () => {
    const { open } = this.state
    this.setState({
      open: !open,
    })
  }

  // 回复按钮
  doReply = (topicId, reply) => {
    const { topicStore } = this.props
    const { newReply } = this.state
    const content = `@${reply.author.loginname} ${newReply}`
    topicStore.doReply(topicId, content, reply.id).then(() => {
      topicStore.getTopicDetail(topicId)
    }).then(() => {
      this.setState({
        newReply: '',
      })
    })
  }

  // simpleMD 回复内容
  handleNewReplyChange = (value) => {
    this.setState({
      newReply: value,
    })
  }


  render() {
    const {
      reply, classes, index, topicId, appState,
    } = this.props
    const { user } = appState
    const { open, newReply } = this.state
    const { loginname, avatar_url: avatarUrl } = reply.author
    return (
      <div className={classes.reply_item}>
        <div className={classes.reply_author_content}>
          <Avatar
            alt={loginname}
            src={avatarUrl}
            onClick={e => this.goToUserInfo(loginname, e)}
            style={{ width: '30px', height: '30px', cursor: 'pointer' }}
            title={loginname}
          />
          <div className={classes.user_info}>
            <a
              className={classes.reply_author}
              onClick={e => this.goToUserInfo(loginname, e)}
              style={{ cursor: 'pointer' }}
            >
              {loginname}
            </a>
            <a className={classes.reply_time} href={`#${reply.id}`}>
              {index}
              楼·
              {dateFormat(reply.create_at, 'yyyy-mm-dd HH:MM:ss')}
            </a>
            {
              user.isLogin ? (
                <IconReply fab color="primary" className={classes.replyIcon} onClick={() => this.toggleDrawer()} />
              ) : null
            }

          </div>
        </div>
        <section className={classes.content}>
          <p dangerouslySetInnerHTML={{ __html: marked(reply.content) }} />
        </section>
        {
          open ? (
            <section className={classes.replyEditor}>
              <SimpleMD
                onChange={this.handleNewReplyChange}
                value={newReply}
                options={{
                  toolbar: false, autofocus: false, spellChecker: false, placeholder: '添加您的精彩回复',
                }}
              />
              <Button variant="contained" color="primary" className={classes.replyButton} onClick={() => this.doReply(topicId, reply)}>回复</Button>
            </section>
          ) : null
        }
        <Divider />
      </div>
    )
  }
}

ReplyItem.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
}

ReplyItem.propTypes = {
  reply: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  topicId: PropTypes.string.isRequired,
}
export default withStyles(styles)(ReplyItem)
