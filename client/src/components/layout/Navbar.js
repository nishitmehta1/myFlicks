import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = (props) => {
  return (
    <div>
      <header>
        <div>
          <Link to="/" className="header" style={{ textDecoration: "none" }}>
            MyFlicks
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
