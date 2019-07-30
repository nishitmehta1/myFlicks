import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
const Navbar = props => {
  return (
    <nav className='navbar navbar-main navbar-expand-lg'>
      <div>
        <Link className='navbar-brand brand' href='#'>
          My Flicks
        </Link>
      </div>
      <div
        className='collapse navbar-collapse dropdown-main'
        id='navbarSupportedContent'
      >
        <ul className='navbar-nav'>
          <li className='nav-item dropdown'>
            <Link
              className='nav-link dropdown-toggle'
              href='#'
              id='navbarDropdown'
              role='button'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              Dropdown
            </Link>
            <div class='dropdown-menu' aria-labelledby='navbarDropdown'>
              <Link class='dropdown-item' href='#'>
                Action
              </Link>
              <Link class='dropdown-item' href='#'>
                Another action
              </Link>
              <div class='dropdown-divider' />
              <Link class='dropdown-item' href='#'>
                Something else here
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
