import React from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidenavbar from "../src/components/sidenavbar";
import Dashboard from "./pages/dashboard";
import Orders from "./pages/orders";
import Parteners from "./pages/parteners";
import Contact from "./pages/Contact";
import SearchHeader from "./components/SearchHeader";


const App = () => {
  return (
    <Router>
      <Sidenavbar />
      <div className="md:ml-64 p-4">
        <SearchHeader className="md:hidden"/>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/delivery" element={<Parteners />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
