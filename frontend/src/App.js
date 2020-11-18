import React, { Component } from 'react';
import { BrowserRouter, Route,Redirect,Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';

import './App.css';

class App extends Component {
  state = {
    userId: null
  };

  login = (userId, tokenExpiration) => {
    this.setState({ userId: userId });
  };

  logout = () => {
    this.setState({userId: null });
  };

  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Redirect from="/" to="/auth" exact/>
        <Route path="/auth" component={AuthPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
