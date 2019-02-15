import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
// 按需加载
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import { inject, observer } from 'mobx-react';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  avatar: {
    width: '30px',
    height: '30px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}

@inject(stores => ({
  appState: stores.appState,
})) @observer
class MainAppBar extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.iconBtnClick = this.iconBtnClick.bind(this)
    this.createBtnClick = this.createBtnClick.bind(this)
    this.loginBtnClick = this.loginBtnClick.bind(this)
  }

  iconBtnClick() {
    const { router } = this.context
    router.history.push({
      pathname: '/',
    })
  }

  createBtnClick() {

  }

  loginBtnClick() {
    const { router } = this.context
    const { appState } = this.props;
    const { isLogin, info } = appState.user
    const pathname = isLogin ? `/user/info/${info.loginname}` : '/user/login'
    router.history.push({
      pathname,
    })
  }

  render() {
    const { classes, appState } = this.props;
    const { isLogin, info } = appState.user
    const { loginname, avatar_url: avatarUrl } = info
    let userBtn = null
    // 是否登录
    if (isLogin) {
      userBtn = (
        <Avatar
          alt={loginname}
          src={avatarUrl}
          className={classes.avatar}
          title={loginname}
          onClick={this.loginBtnClick}
        />
      )
    } else {
      userBtn = <Button color="inherit" onClick={this.loginBtnClick}>登录</Button>
    }
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" onClick={this.iconBtnClick}>
              <MenuIcon />
            </IconButton>
            <Typography className={classes.grow} title="title" color="inherit">
              cNode
            </Typography>
            <Button color="inherit" onClick={this.createBtnClick}>
              新建话题
            </Button>
            {userBtn}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

MainAppBar.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
}
MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainAppBar)
