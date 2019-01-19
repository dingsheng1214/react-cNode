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
}

class MainAppBar extends React.Component {
  constructor(props) {
    super(props)
    this.iconBtnClick = this.iconBtnClick.bind(this)
    this.createBtnClick = this.createBtnClick.bind(this)
    this.loginBtnClick = this.loginBtnClick.bind(this)
  }
/* eslint-disable */
  iconBtnClick() {

  }
  createBtnClick() {

  }
  loginBtnClick() {

  }

  render() {
    const { classes } = this.props;
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
            <Button  color="inherit" onClick={this.createBtnClick}>
              新建话题
            </Button>
            <Button  color="inherit" onClick={this.loginBtnClick}>
              登录
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MainAppBar)
