import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'
import SimpleMDE from 'react-simplemde-editor'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button'
import IconReply from '@material-ui/icons/Reply'
import { withStyles } from '@material-ui/core/styles'

import Container from '../layout/container'
import createStyles from './style'
import { tabs } from '../../util/constant'


@inject(stores => ({
  topicStore: stores.topicStore,
  appState: stores.appState,
})) @observer
class TopicCreate extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor() {
    super()
    this.state = {
      title: '',
      content: '',
      tab: 'dev',
    }
    // this.handleTitleChange = this.handleTitleChange.bind(this)
    // this.handleContentChange = this.handleContentChange.bind(this)
    // this.handleChangeTab = this.handleChangeTab.bind(this)
    // this.handleCreate = this.handleCreate.bind(this)
  }

  handleTitleChange = (e) => {
    const title = e.target.value
    this.setState({
      title,
    })
  }

  handleContentChange = (value) => {
    this.setState({
      content: value,
    })
  }

  handleChangeTab = (e) => {
    this.setState({
      tab: e.currentTarget.value,
    })
  }

  // 创建话题
  handleCreate = () => {
    console.log(this.state);
    const {
      tab, title, content,
    } = this.state
    const { appState, topicStore } = this.props
    const { router } = this.context
    if (!title) {
      console.log('title', title);
      return appState.notify({
        message: '标题必须填写',
      })
    }
    if (!content) {
      console.log(content);
      return appState.notify({
        message: '内容不能为空',
      })
    }
    return topicStore.createTopic(title, tab, content)
      .then(() => {
        router.history.push('/list')
      })
      .catch((err) => {
        appState.notify({
          message: err.message,
        })
      })
  }

  render() {
    const { classes } = this.props
    const { title, content, tab } = this.state
    return (
      <Container>
        <div className={classes.root}>
          <TextField
            className={classes.title}
            label="标题"
            value={title}
            onChange={e => this.handleTitleChange(e)}
            fullWidth
          />
          <SimpleMDE
            onChange={this.handleContentChange}
            value={content}
            options={{
              toolbar: false, autofocus: false, spellChecker: false, placeholder: '发表您的精彩言论',
            }}
          />
          <div>
            {
              Object.keys(tabs).map((currentTab) => {
                if (currentTab !== 'all' && currentTab !== 'good') {
                  return (
                    <span className={classes.selectItem} key={currentTab}>
                      <Radio
                        value={currentTab}
                        checked={currentTab === tab}
                        onChange={e => this.handleChangeTab(e)}
                      />
                      {tabs[currentTab]}
                    </span>
                  )
                }
                return null
              })
            }
            <Button color="primary" onClick={this.handleCreate} className={classes.replyButton}>
              <IconReply />
            </Button>
          </div>

        </div>
      </Container>
    )
  }
}

TopicCreate.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
}

TopicCreate.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(createStyles)(TopicCreate)
