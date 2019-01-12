import ReactDOM from 'react-dom';
import React from 'react'
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import { BrowserRouter } from 'react-router-dom'
import App from './views/App'

const root = document.getElementById('root')
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>,
    root,
  )
}
render(App)

if (module.hot) {
  module.hot.accept('./views/App.jsx', () => {
    const NextApp = require('./views/App.jsx').default //eslint-disable-line
    render(NextApp)
  })
}
