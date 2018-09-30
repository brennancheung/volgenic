import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import AppContext from './AppContext'
import Home from 'components/Home'
import './app.css'

const initialContext = {
  foo: 'bar',
  count: 1,
}

class App extends React.Component {
  render () {
    const theme = createMuiTheme({})

    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <AppContext initialContext={initialContext}>
            <div id="main-container">
              <Switch>
                <Route path="/" exact component={Home} />
                <Redirect to="/" />
              </Switch>
            </div>
          </AppContext>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default App
