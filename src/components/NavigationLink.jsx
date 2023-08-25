import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectAdmin } from '../redux/store';

const NavigationLink = ({ label, path }) => {
  const admin = useSelector(selectAdmin);
  const { admin: isAdmin } = admin ?? {};

  // Validate if the user is admin to display Add and Delete links
  //if ((label === 'Users') && !isAdmin) return null;

  // Validate if the user is not logged in to display just Home and Login links
  //if ((label !== 'Home' && label !== 'Login') && !admin) return null;

  // Validate if the user is logged in to hide Login link
  if (label === 'Login' && admin) return null;

  return (
    <li>
      <NavLink className="nav-link" to={path}>
        {label}
      </NavLink>
    </li>
  );
};

NavigationLink.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default NavigationLink;