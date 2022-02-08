import { Navigate, useLocation } from 'react-router-dom';

import { createContext, useState, useContext } from 'react';
import { useMoralis } from 'react-moralis';
import PropTypes from 'prop-types';

export function useAuth() {
  return useContext(AuthContext);
}

RequireAuth.propTypes = {
  children: PropTypes.element
};

export function RequireAuth({ children }) {
  const { user } = useMoralis();
  const location = useLocation();

  if (!user) {
    console.log('redirecting to login');
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  }
};

const AuthContext = createContext({
  user: {},
  signin: () => {},
  signout: () => {}
});

AuthProvider.propTypes = {
  children: PropTypes.element
};

export function AuthProvider({ children }) {
  const { authenticate, user } = useMoralis();

  const signin = (callback) => {
    authenticate();
  };

  const signout = (callback) =>
    fakeAuthProvider.signout(() => {
      // setUser(null);
      callback();
    });

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
