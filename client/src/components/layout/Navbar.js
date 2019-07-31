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

  onLoginClick = () => {
    this.props.history.push('/login');
  };

  onLogoutClick = () => {
    axios
      .get('http://localhost:4000/users/logout', { withCredentials: true })
      .then(res => {
        if (res.data.data === 'LOGIN') {
          this.setState({
            login: false
          });
        }
      });
    this.props.toggleLogin(false);
    this.props.history.push('/');
  };

  render() {
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
            {this.props.login || this.state.login ? (
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
                    Hello, {this.props.firstname}
                  </Link>
                  <div
                    className='dropdown-menu'
                    aria-labelledby='navbarDropdown'
                  >
                    <Link to='/watchlist' className='dropdown-item' href='#'>
                      My Watchlist
                    </Link>
                    <Link to='/' className='dropdown-item disabled' href='#'>
                      My Friends
                    </Link>
                    <div className='dropdown-divider' />
                    <Link to='/' className='dropdown-item disabled' href='#'>
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
                  className='btn btn-lg login'
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
