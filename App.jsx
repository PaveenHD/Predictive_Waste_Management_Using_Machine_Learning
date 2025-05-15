// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Output from '../src/components//Output';  
import Compliance from '../src/components/Compliance';
import Noncompliance from '../src/components/Non-compliance';
import Logout from '../src/components/Logout'  
import Graph from '../src/components/Graph'
import Chatbot from '../src/components/Chatbot'
function App() {
  return (
    <Router>
      <Chatbot/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/output" element={<Output />} />  
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/noncompliance" element={<Noncompliance />} />  {/* Use the correct case for the route */}
        <Route path="/" element={<Logout />} /> {/* Use the correct case for the route */}
      </Routes>
    </Router>
  );
}

export default App;
