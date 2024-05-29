import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar'; // Import your NavBar component

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarPaths = ['/admin-panel']; // Add paths where the navbar should be hidden

  const shouldShowNavBar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavBar && <NavBar />}
      {children}
    </>
  );
};

export default Layout;
