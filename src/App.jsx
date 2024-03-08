import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Keranjang from "./components/Keranjang";
import Transaction from "./components/Transaction";
import Success from "./components/Success";
import ListTransaction from "./components/ListTransaction";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/keranjang" element={<Keranjang />} />
        <Route path="/checkout/show/:id" element={<Transaction />} />
        <Route path="/list-transaction" element={<ListTransaction />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
};

export default App;
