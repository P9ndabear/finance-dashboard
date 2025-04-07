import React from 'react';

const Favorite = ({ favoriteCoins, onRemoveFavorite, onNavigate }) => {
    const handleRemoveClick = (e, coinId) => {
        e.stopPropagation();
        onRemoveFavorite(coinId);
    };

    return (
        <div className="centered">
            <h2>Favoriete Cryptocurrencies</h2>
            {favoriteCoins.length > 0 ? (
                <ul>
                    {favoriteCoins.map((coin) => (
                        <li
                            key={coin.id}
                            onClick={() => onNavigate(coin.id)}
                        >
                            {coin.name} ({coin.symbol.toUpperCase()})
                            <button onClick={(e) => handleRemoveClick(e, coin.id)}>Verwijder</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Geen favorieten gevonden.</p>
            )}
        </div>
    );
};

export default Favorite;
