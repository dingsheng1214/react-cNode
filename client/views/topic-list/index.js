import React from 'react'
import PropTypes from 'prop-types'
import {
  observer,
  inject,
} from 'mobx-react'
import AppState from '../../store/app-state'

@inject('appState') @observer
class TopicList extends React.Component {
  componentDidMount() {
    // do something
  }

  handleChange = (e) => {
    const { appState } = this.props
    appState.changeName(e.target.value)
  }

  render() {
    const { appState } = this.props
    return (
      <div>
        <input type="text" onChange={this.handleChange} />
        <div>{ appState.msg }</div>
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}

export default TopicList
