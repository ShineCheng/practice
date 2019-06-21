import React from 'react';
import { Router } from 'react-router-dom';
import history from '../history';

import Menu from './Menu';
import Main from './Main';
import ControlBar from './ControlBar';

const App = () => {
    return (
        <Router history={history}>
            <Menu />
            <Main />
            <ControlBar />
        </Router>
    )
};

export default App;