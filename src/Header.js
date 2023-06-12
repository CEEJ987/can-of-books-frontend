import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Welcome from './Welcome';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';




class Header extends React.Component {
  render() {
    
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Welcome</Navbar.Brand>
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        {/* PLACEHOLDER: render a navigation link to the about page */}
        <NavItem><Welcome/></NavItem>

      </Navbar>
    )
  }
}


export default Header;