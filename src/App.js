import React from 'react'

//importazione componenti
import Page from './components/Page'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'

//importazione provider
import AppProvider from './context/AppContext'
import ProvideAuth from './context/ProvideAuth'

import {
  BrowserRouter as Router,
  Switch,
  Route, 
  Link, Redirect
} from "react-router-dom";

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();


function App() {

  return (
    <div className="App">
      <Router history={history}>
        <AppProvider> 
          <ProvideAuth>

            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>

              <PrivateRoute exact path="/main">
                <Page />
              </PrivateRoute>

              <Route path="/">
                <Redirect to="/login" />
              </Route>

            </Switch>
          </ProvideAuth>

        </AppProvider>
      </Router>

    </div>
  )

}

export default App