import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      notfound: false,
      incorrectPass: false,
      sessionID: '',
      user: {}
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:4000/users/', { withCredentials: true })
      .then(res => {
        console.log(res.data.data);
        if (res.data.data === 'LOGGEDIN') {
          this.props.history.push('/');
        } else if (res.data.data === 'LOGIN') {
          this.props.history.push('/login');
        }
      });
  }

  onChangeEmail = e => {
    this.setState({
      email: e.target.value,
      notfound: false,
      incorrectPass: false,
      user: []
    });
  };

  onChangePassword = e => {
    this.setState({
      password: e.target.value,
      incorrectPass: false
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const user = {
      email: this.state.email.toLowerCase(),
      password: this.state.password
    };

    axios
      .post('http://localhost:4000/users/login', user, {
        withCredentials: true
      })
      .then(res => {
        if (res.data.data === 'NOTFOUND') {
          this.setState({
            notfound: !this.state.notfound
          });
        } else if (res.data.data === 'INVALID') {
          this.setState({
            incorrectPass: true
          });
        } else if (res.data.data === 'PASS') {
          this.setState({ user: res.data.user, incorrectPass: false }, () => {
            this.props.setUser(this.state.user, true);
            console.log(this.state.user);
          });
          this.props.history.push('/');
        }
      });
  };

  render() {
    return (
      <div className=''>
        <div className='container'>
          <div className='login'>
            <form className='card' onSubmit={this.onSubmit}>
              <div className='form-group formEmail'>
                <label htmlFor='exampleInputEmail1'>Email address</label>
                <input
                  type='email'
                  onChange={this.onChangeEmail}
                  className={`form-control ${
                    this.state.notfound ? 'redBorder' : ''
                  }`}
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='Enter email'
                  required
                />
                {this.state.notfound ? (
                  <small className='notFoundError'>Email id not found</small>
                ) : (
                  ''
                )}
              </div>
              <div className='form-group formPassword formPasswordInt'>
                <label htmlFor='exampleInputPassword1'>Password</label>
                <input
                  type='password'
                  onChange={this.onChangePassword}
                  className='form-control'
                  id='exampleInputPassword1'
                  placeholder='Password'
                  required
                />
                {this.state.incorrectPass ? (
                  <small className='incorrectPass'>
                    Email and Password do not match
                  </small>
                ) : (
                  ''
                )}
              </div>
              <button type='submit' className='loginButton btn-primary'>
                Submit
              </button>
            </form>
            <div className='createAccountLink'>
              <Link to='/createAccount'>Create Account?</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LogIn);
