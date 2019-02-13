import ReactDOM from 'react-dom';
import React from 'react'
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { lightBlue, pink } from '@material-ui/core/colors';
import App from './views/App'
import { topicStore, AppState } from './store'

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: pink,
  },
  typography: {
    useNextVariants: true,
  },
});

const appState = new AppState()

const root = document.getElementById('root')
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <Provider appState={appState} topicStore={topicStore}>
          <MuiThemeProvider theme={theme}>
            <Component />
          </MuiThemeProvider>
        </Provider>
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
