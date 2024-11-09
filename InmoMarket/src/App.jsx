import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import SellProperty from "./pages/sell-property/SellProperty";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< Login />} />
        <Route path="/home" element={< Home />} />
        <Route path="/sell-property" element={< SellProperty />} />
      </Routes>
    </Router>
); }
export default App;