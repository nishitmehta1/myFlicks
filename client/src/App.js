import React, { Component } from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Main from './components/Main';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Movie from './components/Movie';
import Watchlist from './components/Watchlist';
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
        <Navbar user={this.state.user} />
        <Route
          exact
          path='/'
          component={props => <Main user={this.state.user} />}
        />
        <Route
          exact
          path='/login'
          component={props => <Login setUser={this.setUser} />}
        />
        <Route exact path='/createaccount' component={CreateAccount} />
        <Route exact path='/movie/:id' component={Movie} />
        <Route exact path='/watchlist' component={Watchlist} />
      </Router>
    );
  }
}

export default App;
