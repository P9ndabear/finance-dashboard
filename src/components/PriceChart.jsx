import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PriceChart = ({ coinData }) => {
    if (!coinData) return null;

    const marketCap = coinData.market_data.market_cap.usd;
    const volume = coinData.market_data.total_volume.usd;
    const price = coinData.market_data.current_price.usd;

    const data = {
        labels: ['Marktkapitalisatie', 'Volume (24u)', 'Prijs'],
        datasets: [
            {
                data: [marketCap, volume, price],
                backgroundColor: ['Red', 'Blue', 'Yellow'],
                hoverBackgroundColor: ['Red', 'Blue', 'Yellow'],
            },
        ],
    };

    return (
        <div className="chart-container">
            <h3>Prijsgegevens voor {coinData.name}</h3>
            <Pie data={data} />
        </div>
    );
};

export default PriceChart;
