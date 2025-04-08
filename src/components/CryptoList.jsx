import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import Favorite from './Favorite';
import axios from 'axios';
import '../styles/main.scss';

const CryptoList = () => {
    const [coins, setCoins] = useState([]);
    const [filteredCoins, setFilteredCoins] = useState([]);
    const [favoriteCoins, setFavoriteCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favoriteCoins'));
        if (storedFavorites) {
            setFavoriteCoins(storedFavorites);
        }
    }, []);

    useEffect(() => {
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1")
            .then((response) => {
                setCoins(response.data);
                setFilteredCoins(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Er is een fout opgetreden bij het ophalen van de data:", error);
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

    useEffect(() => {
        if (favoriteCoins.length > 0) {
            localStorage.setItem('favoriteCoins', JSON.stringify(favoriteCoins));
        }
    }, [favoriteCoins]);

    const handleAddFavorite = (coin) => {
        const alreadyFavorite = favoriteCoins.some(fav => fav.id === coin.id);
        if (!alreadyFavorite) {
            setFavoriteCoins(prevFavorites => {
                const updatedFavorites = [...prevFavorites, coin];
                localStorage.setItem('favoriteCoins', JSON.stringify(updatedFavorites));
                return updatedFavorites;
            });
        }
    };

    const handleRemoveFavorite = (id) => {
        const updatedFavorites = favoriteCoins.filter(coin => coin.id !== id);
        setFavoriteCoins(updatedFavorites);
        localStorage.setItem('favoriteCoins', JSON.stringify(updatedFavorites));
    };

    const handleNavigate = (id) => {
        navigate(`/coin/${id}`);
    };

    const handleFavoriteClick = (e, coin) => {
        e.stopPropagation();
        handleAddFavorite(coin);
    };

    if (loading) return <p>Laden...</p>;

    return (
        <div>
            <h1>Cryptocurrency List</h1>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <div>
                <Favorite
                    favoriteCoins={favoriteCoins}
                    onRemoveFavorite={handleRemoveFavorite}
                    onNavigate={handleNavigate}
                />
            </div>
            <ul>
                {filteredCoins.slice(0, 100).map((coin) => {
                    const isFavorite = favoriteCoins.some(fav => fav.id === coin.id);
                    return (
                        <li
                            key={coin.id}
                            onClick={() => handleNavigate(coin.id)}
                        >
                            {coin.name} ({coin.symbol.toUpperCase()}): ${coin.current_price.toFixed(2)}
                            <button
                                className={isFavorite ? 'favoriet' : ''}
                                onClick={(e) => handleFavoriteClick(e, coin)}
                                disabled={isFavorite}
                            >
                                {isFavorite ? 'Favoriet' : 'Voeg toe aan favorieten'}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CryptoList;
