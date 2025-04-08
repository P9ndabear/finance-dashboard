import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PriceChart from './PriceChart';
import axios from 'axios';
import '../styles/main.scss';

const CryptoDetails = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
            .then((response) => {
                setCoin(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Er is een fout opgetreden bij het ophalen van de data:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Laden...</p>;
    if (!coin) return <p>Geen data gevonden.</p>;

    return (
        <div className="crypto-details">
            <h2>Details voor {coin.name}</h2>
            <p>Symbol: {coin.symbol.toUpperCase()}</p>
            <p>Rank: {coin.market_cap_rank}</p>
            <p>Prijs (USD): ${coin.market_data.current_price.usd.toFixed(2)}</p>
            <p>Marktkapitalisatie: ${coin.market_data.market_cap.usd.toLocaleString()}</p>
            <p>Volume (24u): ${coin.market_data.total_volume.usd.toLocaleString()}</p>
            <p>Verandering (24u): {coin.market_data.price_change_percentage_24h.toFixed(2)}%</p>

            <PriceChart coinData={coin} />
        </div>
    );
};

export default CryptoDetails;
