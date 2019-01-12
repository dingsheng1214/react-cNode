import ReactDOM from 'react-dom';
import React from 'react'
import App from './views/App'
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line

const root = document.getElementById('root')
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    root,
  )
}
render(App)

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./App.jsx').default //eslint-disable-line
    render(NextApp)
  })
}
