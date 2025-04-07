import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CryptoList from "./components/CryptoList";
import CryptoDetails from "./components/CryptoDetails";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CryptoList />} />
                <Route path="/" element={<CryptoDetails />} />
                <Route path="/coin/:id" element={<CryptoDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
