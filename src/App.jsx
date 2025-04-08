import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CryptoList from "./components/CryptoList";
import CryptoDetails from "./components/CryptoDetails";
import ProductPieChart from './components/ProductPieChart';
import Navbar from './components/Navbar';  // Importeer de Navbar component


function App() {
    return (
        <Router>
            <Navbar />  {/* Voeg de Navbar toe aan je layout */}
            <Routes>
                <Route path="/" element={<CryptoList />} />
                <Route path="/" element={<CryptoDetails />} />
                <Route path="/coin/:id" element={<CryptoDetails />} />
                <Route path="/top-coins" element={<ProductPieChart />} />
            </Routes>
        </Router>
    );
}

export default App;
