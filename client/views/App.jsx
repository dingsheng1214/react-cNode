import React from 'react';
// import DevTools from 'mobx-react-devtools'
import Routes from '../config/router'
import AppBar from './layout/app-bar'

export default class App extends React.Component {
  componentDidMount() {
    // do something
  }

  render() {
    return (
      <div>
        <AppBar />
        <Routes key="routes" />
      </div>
    )
  }
}
