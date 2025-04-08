import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.scss';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className={"navbar-li"}>
                    <Link to="/" className="navbar-item">Home</Link>
                </li>
                <li className={"navbar-li"}>
                    <Link to="/top-coins" className="navbar-item">Top 10 Coins Chart</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
