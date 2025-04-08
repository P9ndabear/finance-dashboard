import React from 'react';

const PriceChanges = ({ coins }) => {
    const calculatePriceChangePercentage = (coin) => {
        return coin.price_change_percentage_24h || 0;
    };

    const getColorBasedOnChange = (percentage) => {
        return percentage > 0 ? 'Green' : 'Red';
    };

    return (
        <div className="price-changes">
            {coins.map((coin) => (
                <div key={coin.id} className="coin-change">
                    <h4>{coin.name} ({coin.symbol.toUpperCase()})</h4>
                    <p>Prijsverandering (24 uur): {calculatePriceChangePercentage(coin).toFixed(2)}%</p>
                    <p style={{ color: getColorBasedOnChange(calculatePriceChangePercentage(coin)) }}>
                        {calculatePriceChangePercentage(coin) > 0 ? 'Gestegen' : 'Gedaald'}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default PriceChanges;
