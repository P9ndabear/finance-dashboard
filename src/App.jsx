// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CryptoList from "./components/CryptoList";  // Zorg ervoor dat CryptoList goed is geïmporteerd

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CryptoList />} />
            </Routes>
        </Router>
    );
}

export default App;
