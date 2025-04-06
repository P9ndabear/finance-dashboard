import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CryptoList = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://api.coincap.io/v2/assets")
            .then((response) => response.json())
            .then((json) => {
                setCoins(json.data);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Laden...</p>;

    return (
        <div>
            <h1>Cryptocurrency List</h1>
            <ul>
                {coins.map((coin) => (
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
