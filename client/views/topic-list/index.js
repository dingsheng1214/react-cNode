import React from 'react'
import PropTypes from 'prop-types'
// import axios from 'axios'
import {
  observer,
  inject,
} from 'mobx-react'

import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';

// import AppState from '../../store/app-state'
import Container from '../layout/container'
import TopicListItem from './list-item'

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});


@inject(stores => (
  {
    appState: stores.appState,
    topicStore: stores.topicStore,
  }
)) @observer
class TopicList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabIndex: 0,
      // topics: [],
    }
    this.changeTab = this.changeTab.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const { topicStore } = this.props
    topicStore.fetchTopics()
  }

  changeTab(e, tabIndex) {
    this.setState({
      tabIndex,
    })
  }

  handleClick() {
    const { tabIndex } = this.state
    console.log(tabIndex)
  }

  render() {
    const { classes, topicStore } = this.props
    const { tabIndex } = this.state
    const { topics } = topicStore

    return (
      <div className={classes.root}>
        <Container>
          <Tabs
            value={tabIndex}
            onChange={this.changeTab}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="全部" />
            <Tab label="精华" />
            <Tab label="分享" />
            <Tab label="问答" />
            <Tab label="招聘" />
            <Tab label="客户端测试" />
          </Tabs>
          <List>
            {
              topics.map(topic => (
                <TopicListItem topic={topic} onClick={this.handleClick} key={topic.id} />
              ))
            }
          </List>

        </Container>
      </div>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
}
TopicList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TopicList)
