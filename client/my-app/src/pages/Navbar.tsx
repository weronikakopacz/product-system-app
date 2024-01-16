import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import { getAccessToken } from '../services/AuthService';

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
        {getAccessToken() ? (
          <>
            <Link className="navbar-link" to="/logout">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link className="navbar-link" to="/login">
              Login
            </Link>
            <Link className="navbar-link" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
