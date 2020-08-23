import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { logOutUser } from '../../store/actions/authActions';
import './styles.css';

const Navbar = ({ auth, logOutUser, history }) => {
  const onLogOut = (event) => {
    event.preventDefault();
    logOutUser(history);
  };

  return (
    <nav className="navbar">
      <h2 className="logo">AMAZONA</h2>
      <ul className="nav-links flex-1">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        {auth.isAuthenticated ? (
          <>
            {auth.me?.isSeller ? (
              <li className="nav-item">
                <Link to={`/seller-dashboard`}>Dashboard</Link>
              </li>
            ) : (
                <li className="nav-item">
                  <Link to="/register-seller">Register as Seller</Link>
                </li>
              )}
            <li className="flex-1" />
            <img className="avatar" src={auth.me.avatar} />
            <li className="nav-item" onClick={onLogOut}>
              <a href="#">Log out</a>
            </li>
          </>
        ) : (
            <>
              <li className="flex-1" />

              <li className="nav-item">
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(withRouter, connect(mapStateToProps, { logOutUser }))(Navbar);
