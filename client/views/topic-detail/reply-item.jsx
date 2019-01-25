import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';


import marked from 'marked'
import styles from './style'

class ReplyItem extends React.Component {
  componentDidMount() {
    // todo
  }

  render() {
    const { reply, classes, index } = this.props
    const { loginname, avatar_url: avatarUrl } = reply.author
    return (
      <div className={classes.reply_item}>
        <div className={classes.reply_author_content}>
          <a href={`/user/${loginname}`}>
            <Avatar
              alt={loginname}
              src={avatarUrl}
              style={{ width: '30px', height: '30px' }}
              title={loginname}
            />
          </a>
          <div className={classes.user_info}>
            <a className={classes.reply_author} href={`/user/${loginname}`}>{loginname}</a>
            <a className={classes.reply_time} href={`#${reply.id}`}>
              {index}
              楼·
              {reply.create_at}
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
