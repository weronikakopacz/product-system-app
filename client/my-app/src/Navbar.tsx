import React from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar-container">
      <div>
        <Link className="navbar-link" to="/">
          Home
        </Link>
        <Link className="navbar-link" to="/add">
          Add Product
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;