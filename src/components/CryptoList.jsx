import React, { useState, useEffect } from 'react';

const CryptoList = () => {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        fetch("https://api.coincap.io/v2/assets")
            .then((response) => response.json())
            .then((json) => setCoins(json.data));
    }, []);

    return (
        <div>
            <h1>Cryptocurrency List</h1>
            <ul>
                {coins.map((coin) => (
                    <li key={coin.id}>
                        {coin.name} ({coin.symbol}): ${parseFloat(coin.priceUsd).toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CryptoList;
