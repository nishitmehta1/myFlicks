import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
  componentDidMount = async () => {
    console.log('DID MOUNT');
    await axios
      .get('http://localhost:4000/users/', { withCredentials: true })
      .then(res => {
        if (res.data.data === 'LOGGEDIN') {
          this.setState({
            login: true,
            firstname: res.data.user.name.first,
            lastname: res.data.user.name.last
          });
        } else if (res.data.data === 'LOGIN') {
          this.setState({
            login: false
          });
        }
      });
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
            {this.state.login ? (
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
                    Hello, {this.state.firstname}
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
                      Something else here
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

export default Navbar;
