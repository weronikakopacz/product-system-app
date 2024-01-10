import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Add from './pages/Add';
import Home from './pages/Home';
import Navbar from './pages/Navbar'
import Details from './pages/Details';

function App() {

  return (
    <Router>
      <div className="App"> 
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/product/:id" element={<Details />} />
        </Routes>
      </div>
    
    </Router>
  );
}

export default App;