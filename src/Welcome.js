import React, { useEffect } from "react";
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';

function WelcomePage() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  useEffect(() => {
    // Add any necessary initialization logic here
  }, []);

  return (
    <div className="welcome-page-container">
      <header>
        <h1>Welcome</h1>
        {!isAuthenticated && (
          <Button onClick={() => loginWithRedirect()}>Log In</Button>
        )}
        {isAuthenticated && (
          <Button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</Button>
        )}
      </header>
    </div>
  );
}

export default WelcomePage;
