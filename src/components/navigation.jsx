import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAdmin } from '../redux/store';
import { logout } from '../redux/adminsSlice';
import NavigationLink from './NavigationLink';

const links = [
    { label: 'Users', path: '/users' },
    { label: 'Home', path: '/' },
    { label: 'Login', path: '/login' },
  ];

const Navigation = () => {
    const dispatch = useDispatch();
    const admin = useSelector(selectAdmin);

    const handleLogout = () => {
        dispatch(logout());
      };

    return (
        <ul className="navbar-nav">
        {links.map((link) => (
          <NavigationLink
            key={link.label}
            label={link.label}
            path={link.path}
          />
        ))}

        {admin && (
          <li>
            <button type="button" className="nav-link logout-button" onClick={handleLogout}>
              Log out
            </button>
          </li>
        )}
      </ul>

    );
};

export default Navigation;