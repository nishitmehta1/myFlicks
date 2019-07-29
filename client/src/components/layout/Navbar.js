import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
const Navbar = props => {
  return (
    <div>
      <header>
        <Link to='/' className='header' style={{ textDecoration: 'none' }}>
          <h1 className='header'>MyFlicks</h1>
        </Link>
      </header>
    </div>
  );
};

export default Navbar;
