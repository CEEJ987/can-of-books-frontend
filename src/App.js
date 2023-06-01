import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About'; // Assuming you have an About component file
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router className="App">
        <Header/>
        <Routes>
          <Route
            exact path="/"
            element={<BestBooks/>}
          />
          {/* PLACEHOLDER: aa a route with a path of /'about' that renders the 'About' component*/}
          <Route
            path="/about"
            element={<About/>}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;