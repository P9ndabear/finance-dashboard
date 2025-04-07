import React from 'react';
import '../styles/main.scss';

const SearchBar = ({ value, onChange }) => {
    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Zoek op naam..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;
