import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import { getAccessToken } from '../services/AuthService';
import { checkUserRole } from '../user/CheckUserRole';

const Navbar: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await checkUserRole();
      setIsAdmin(role === 'admin');
    };

    fetchUserRole();
  }, []);

  return (
    <nav className="navbar-container">
      <div>
        <Link className="navbar-link" to="/">
          Home
        </Link>
        <Link className="navbar-link" to="/add">
          Add Product
        </Link>
        {isAdmin && (
          <Link className="navbar-link" to="/categories">
            Manage Categories
          </Link>
        )}
        {getAccessToken() ? (
          <>
            <Link className="navbar-link" to="/user">
              Profile
            </Link>
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