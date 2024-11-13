import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import SellProperty from "./pages/sell-property/SellProperty";
import PropertyDetails from "./pages/property-details/PropertyDetails";
import { AuthProvider } from "./contexts/AuthContext";


function App() {
  return (
    < AuthProvider >
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sell-property" element={<SellProperty />} />
          <Route path="/property-details/:id" element={<PropertyDetails />} />
        </Routes>
      </Router>
    </AuthProvider >
); }
export default App;