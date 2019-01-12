import React from 'react';
import Routes from '../config/router'

export default class App extends React.Component {
  componentDidMount() {
    // do something
  }

  render() {
    return [
      <div>This is app</div>,
      <Routes />,
    ]
  }
}
