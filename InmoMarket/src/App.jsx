import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import SellProperty from "./pages/sell-property/SellProperty";
import PropertyDetails from "./pages/property-details/PropertyDetails";
import MyProperties from "./pages/my-properties/MyProperties";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./utils/protectedRoutes";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/sell-property" element={<SellProperty />} />
            <Route path="/property-details/:id" element={<PropertyDetails />} />
            <Route path="/my-publications" element={<MyProperties />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;