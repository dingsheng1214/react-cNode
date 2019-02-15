import React from 'react'
import PropTypes from 'prop-types'
import {
  observer,
  inject,
} from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar';
import UserIcon from '@material-ui/icons/AccountCircle';
import Container from '../layout/container'
import userStyles from './styles/user-style'

@inject(stores => ({
  user: stores.appState.user,
})) @observer
class User extends React.Component {
  componentDidMount() {
    // do someting here
  }

  render() {
    const {
      classes, user, children, isLoginPage,
    } = this.props
    const { avatar_url: avatarUrl, loginname } = user.detail
    console.log('user ', isLoginPage);
    return (
      <Container>
        <div className={classes.avatar}>
          <div className={classes.bg} />
          {
            avatarUrl && !isLoginPage
              ? <Avatar className={classes.avatarImg} src={avatarUrl} />
              : (
                <Avatar className={classes.avatarImg}>
                  <UserIcon />
                </Avatar>
              )
          }
          <span className={classes.userName}>{(loginname && !isLoginPage) ? loginname : '未登录'}</span>
        </div>
        {children}
      </Container>
    )
  }
}

User.wrappedComponent.propTypes = {
  user: PropTypes.object.isRequired,
}

User.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  isLoginPage: PropTypes.bool,
}
export default withStyles(userStyles)(User)
