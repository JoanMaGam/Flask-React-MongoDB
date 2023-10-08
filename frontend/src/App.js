import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Users } from './components/Users';
import About from './components/About';
import { NavBar } from './components/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container p-4">
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Users />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
