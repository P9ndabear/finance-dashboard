import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import '../styles/main.scss';

const CryptoList = () => {
    const [coins, setCoins] = useState([]);
    const [filteredCoins, setFilteredCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://api.coincap.io/v2/assets")
            .then((response) => response.json())
            .then((json) => {
                setCoins(json.data);
                setFilteredCoins(json.data);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const filtered = coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(term) ||
                coin.symbol.toLowerCase().includes(term)
        );
        setFilteredCoins(filtered);
    }, [searchTerm, coins]);

    if (loading) return <p>Laden...</p>;

    return (
        <div>
            <h1>Cryptocurrency List</h1>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <ul>
                {filteredCoins.map((coin) => (
                    <li
                        key={coin.id}
                        onClick={() => navigate(`/coin/${coin.id}`)}
                    >
                        {coin.name} ({coin.symbol}): ${parseFloat(coin.priceUsd).toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CryptoList;
