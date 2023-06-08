import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Carousel, Modal } from 'react-bootstrap';
import axios from 'axios';
import BestBooks from './BestBooks';
import About from './About'; // Assuming you have an About component file
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from './Welcome';
import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <Router className="App">
        <Header />
        <Routes>
          <Route
            exact path="/"
            element={isAuthenticated ? <BestBooks /> : <WelcomePage />}
          />
          <Route exact path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
