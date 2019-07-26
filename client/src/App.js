import React, { Component } from "react";
import "./App.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Login} />
        <Route path="/createaccount" exact component={CreateAccount} />
      </Router>
    );
  }
}

export default App;
