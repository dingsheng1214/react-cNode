import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import dateFormat from 'dateformat'


import marked from 'marked'
import styles from './style'

class ReplyItem extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    // todo
  }

  goToUserInfo = (loginname, e) => {
    e.preventDefault()
    const { router } = this.context
    router.history.push({
      pathname: `/user/info/${loginname}`,
    })
  }

  render() {
    const { reply, classes, index } = this.props
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
          </div>
        </div>
        <section className={classes.content}>
          <p dangerouslySetInnerHTML={{ __html: marked(reply.content) }} />
        </section>
        <Divider />
      </div>
    )
  }
}

ReplyItem.propTypes = {
  reply: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
}
export default withStyles(styles)(ReplyItem)
