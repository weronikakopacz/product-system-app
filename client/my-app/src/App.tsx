import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Add from './pages/Add';
import Home from './pages/Home';
import Navbar from './pages/Navbar'
import Details from './pages/Details';
import Login from './user/Login';
import Registration from './user/Registration';
import Logout from './user/Logout';
import UserProfile from './user/UserProfile';

function App() {

  return (
    <Router>
      <div className="App"> 
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/product/:id" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/user" element={<UserProfile />} />
        </Routes>
      </div>
    
    </Router>
  );
}

export default App;