import React from 'react'
import PropTypes from 'prop-types'
import {
  observer,
  inject,
} from 'mobx-react'

import Container from '../layout/container'


@inject(stores => (
  {
    topicStore: stores.topicStore,
  }
)) @observer
class TopicDetail extends React.Component {
  componentDidMount() {
    this.getTopicDetail()
  }

  getTopicId() {
    const { match } = this.props
    return match.params.id
  }

  getTopicDetail() {
    const { topicStore } = this.props
    const id = this.getTopicId()
    return topicStore.getTopicDetail(id)
  }

  render() {
    const detail = this.getTopicDetail()
    console.log(detail)
    return (
      <Container>
        <div>This is topic detail</div>
      </Container>
    )
  }
}

TopicDetail.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
}

TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
}

export default TopicDetail
