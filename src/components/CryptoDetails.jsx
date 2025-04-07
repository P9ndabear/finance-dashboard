import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/main.scss';

const CryptoDetails = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.coincap.io/v2/assets/${id}`)
            .then((res) => res.json())
            .then((json) => {
                setCoin(json.data);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Laden...</p>;
    if (!coin) return <p>Geen data gevonden.</p>;

    return (
        <div className="crypto-details">
            <h2>Details voor {coin.name}</h2>
            <p>Symbol: {coin.symbol}</p>
            <p>Rank: {coin.rank}</p>
            <p>Prijs (USD): ${parseFloat(coin.priceUsd).toFixed(2)}</p>
            <p>Marktkapitalisatie: ${parseFloat(coin.marketCapUsd).toLocaleString()}</p>
            <p>Volume (24u): ${parseFloat(coin.volumeUsd24Hr).toLocaleString()}</p>
            <p>Verandering (24u): {parseFloat(coin.changePercent24Hr).toFixed(2)}%</p>
        </div>
    );
};

export default CryptoDetails;
