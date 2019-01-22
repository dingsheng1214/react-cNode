import React from 'react'
import PropTypes from 'prop-types'
import {
  observer,
  inject,
} from 'mobx-react'
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';

import queryString from 'query-string'
import Container from '../layout/container'
import TopicListItem from './list-item'
import { tabs } from '../../util/constant'

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 0',
  },
});


@inject(stores => (
  {
    appState: stores.appState,
    topicStore: stores.topicStore,
  }
)) @observer
class TopicList extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.changeTab = this.changeTab.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  // 页面首次加载数据
  componentDidMount() {
    this.fetchTopics()
  }

  componentWillReceiveProps(nextProps) {
    const { topicStore, location } = this.props
    console.log('---->')
    if (nextProps.location.search !== location.search) {
      console.log('<-----')
      topicStore.fetchTopics(this.getTab(nextProps.location.search))
    }
  }

  // 获取当前tab
  getTab(search) {
    const { location } = this.props
    search = search || location.search
    const query = queryString.parse(search)
    const tab = query.tab || 'all'
    return tab
  }

  // mobx 提供的 action
  fetchTopics(tab) {
    const { topicStore } = this.props
    topicStore.fetchTopics(tab)
  }

  // 切换tab
  changeTab(e, tab) {
    console.log(this.context)
    const { router } = this.context
    router.history.push({
      pathname: '/list',
      search: `?tab=${tab}`,
    })
    // this.fetchTopics(tab)
    console.log(this.props)
    console.log(this.context)
  }

  handleClick() {

  }


  render() {
    const { classes, topicStore } = this.props
    console.log(this.props)
    const { topics, syncing } = topicStore
    const tab = this.getTab()
    return (
      <div className={classes.root}>
        <Container>
          <Tabs
            value={tab}
            onChange={this.changeTab}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {
              Object.keys(tabs).map(n => <Tab label={tabs[n]} value={n} key={n} />)
            }
          </Tabs>
          <List>
            {
              syncing ? <div className={classes.loading}><CircularProgress color="secondary" size={80} /></div>
                : topics.map(topic => (
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
  location: PropTypes.object.isRequired,
  // history: PropTypes.object.isRequired,
}

export default withStyles(styles)(TopicList)
