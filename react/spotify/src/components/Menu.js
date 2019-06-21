import React from 'react';
import { Link } from 'react-router-dom';

import '../style/Menu.css';

const Menu = () => {
    return (
        <div className="menu">
            <ul className="main">
                <li>
                    <Link to="/">
                        <i className="home icon"></i>
                        首頁
                    </Link>
                </li>
            </ul>
            <ul className="lists">
                <li className="title">
                    你的音樂庫
                </li>
                <li>
                    <Link to="/userplaylist">
                        音樂
                    </Link>
                </li>
            </ul>
        </div>
    )
};

export default Menu;