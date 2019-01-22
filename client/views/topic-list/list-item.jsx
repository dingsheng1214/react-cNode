import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import primaryStyles from './style'
import { tabs } from '../../util/constant'

const Primary = ({ classes, topic }) => (
  <div className={classes.root1}>
    <div className={classes.root2}>
      <div className={classes.root3}>
        <span className={classes.reply}>{topic.reply_count}</span>
        <span>/</span>
        <span className={classes.read}>{topic.visit_count}</span>
      </div>
      {
        topic.top === true || topic.good === true
          ? <span className={classes.topTab}>{ topic.top === true ? '置顶' : tabs.good }</span>
          : <span className={classes.normalTab}>{ tabs[topic.tab] }</span>
      }

      <span className={classes.title}>{topic.title}</span>
    </div>
    <div className={classes.create}>
      {/* <Avatar src={topic.image} /> */}
      <span>
        更新时间:
        {topic.last_reply_at}
      </span>
    </div>
  </div>
)
Primary.propTypes = {
  topic: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const StyledPrimary = withStyles(primaryStyles)(Primary)

const TopicListItem = ({ onClick, topic }) => (
  <Fragment>
    <ListItem button onClick={onClick}>
      <ListItemAvatar>
        <Avatar
          alt={topic.author.loginname}
          src={topic.author.avatar_url}
          style={{ width: '30px', height: '30px' }}
          title={topic.author.loginname}
        />
      </ListItemAvatar>
      <ListItemText primary={<StyledPrimary topic={topic} />} />
    </ListItem>
    <Divider variant="middle" />
  </Fragment>
)
TopicListItem.propTypes = {
  topic: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}
export default TopicListItem
