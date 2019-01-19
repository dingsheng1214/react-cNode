import ReactDOM from 'react-dom';
import React from 'react'
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';
import App from './views/App'
import appState from './store/app-state'

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    useNextVariants: true,
  },
});
const root = document.getElementById('root')
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <Provider appState={appState}>
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
