import React, { Component } from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  setUser = user => {
    this.setState({ user });
  };

  render() {
    return (
      <Router>
        <Route
          path='/'
          exact
          component={props => <Main user={this.state.user} />}
        />
        <Route
          path='/login'
          exact
          component={props => <Login setUser={this.setUser} />}
        />
        <Route path='/createaccount' exact component={CreateAccount} />
      </Router>
    );
  }
}

export default App;
