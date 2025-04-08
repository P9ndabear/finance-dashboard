import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import PriceChanges from './PriceChanges';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProductPieChart = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1")
            .then((response) => {
                setCoins(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Laden...</p>;

    const top10Coins = coins.slice(0, 10);

    const chartData = {
        labels: top10Coins.map((coin) => `${coin.name} (${coin.symbol.toUpperCase()})`),
        datasets: [
            {
                data: top10Coins.map((coin) => coin.market_cap),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#FFDB3D', '#4BC0C0', '#9966FF', '#FF6600', '#FF00FF', '#000000'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#FFDB3D', '#4BC0C0', '#9966FF', '#FF6600', '#FF00FF', '#000000'],
            },
        ],
    };

    return (
        <div className="chart-container">
            <h3>Marktaandeel van de Top 10 Cryptocurrencies</h3>
            <Pie data={chartData} />
            <PriceChanges coins={coins} /> {}
        </div>
    );
};

export default ProductPieChart;
