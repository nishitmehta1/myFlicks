import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import './Navbar.css';
import axios from 'axios';
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      firstname: '',
      lastname: ''
    };
  }

  // componentWillMount = async () => {
  //   console.log('DID MOUNT');
  //   await axios
  //     .get('http://localhost:4000/users/', { withCredentials: true })
  //     .then(res => {
  //       if (res.data.data === 'LOGGEDIN') {
  //         this.setState({
  //           login: true,
  //           firstname: res.data.user.name.first,
  //           lastname: res.data.user.name.last
  //         });
  //       } else if (res.data.data === 'LOGIN') {
  //         this.setState({
  //           login: false
  //         });
  //       }
  //     });
  // };

  onLoginClick = () => {
    this.props.history.push('/login');
  };

  onLogoutClick = () => {
    axios
      .get('http://localhost:4000/users/logout', { withCredentials: true })
      .then(res => {
        if (res.data.data === 'LOGIN') {
          this.setState({
            login: false,
            firstname: '',
            lastname: ''
          });
        }
      });
    this.props.toggleLogin(false);
    this.props.history.push('/');
  };

  render() {
    console.log(this.props.login);
    return (
      <nav className='navbar navbar-main navbar-expand-lg'>
        <div className='nav-container'>
          <div className='brand-div'>
            <Link to='/' className='navbar-brand brand mr-auto' href='#'>
              My Flicks
            </Link>
          </div>
          <div
            className='collapse navbar-collapse dropdown-main'
            id='navbarSupportedContent'
          >
            {this.props.login ? (
              <ul className='navbar-nav'>
                <li className='nav-item dropdown'>
                  <Link
                    to='/'
                    className='nav-link dropdown-toggle'
                    href='#'
                    id='navbarDropdown'
                    role='button'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    Hello, {this.props.user.name.first}
                  </Link>
                  <div
                    className='dropdown-menu'
                    aria-labelledby='navbarDropdown'
                  >
                    <Link to='/watchlist' className='dropdown-item' href='#'>
                      My Watchlist
                    </Link>
                    <Link to='/' className='dropdown-item' href='#'>
                      My Friends
                    </Link>
                    <div className='dropdown-divider' />
                    <Link to='/' className='dropdown-item' href='#'>
                      Edit Profile
                    </Link>
                    <Link
                      to='/'
                      onClick={() => {
                        this.onLogoutClick();
                      }}
                      className='dropdown-item'
                      href='#'
                    >
                      Logout
                    </Link>
                  </div>
                </li>
              </ul>
            ) : (
              <div>
                <button
                  style={{ width: '10rem' }}
                  className='btn btn-primary btn-lg login'
                  onClick={this.onLoginClick}
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
