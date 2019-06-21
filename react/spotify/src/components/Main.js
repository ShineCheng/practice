import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AddressBar from './AddressBar';
import CollectionList from './CollectionList';
import PlayList from './PlayList';
import UserPlayList from './UserPlayList';
import Search from './Search';

import '../style/Main.css';

const Main = () => {
    return (
        <div className="main">
            <AddressBar />
            <Switch>
                <Route path="/" exact component={CollectionList} />
                <Route path="/playlist/:type/:id" exact component={PlayList} />
                <Route path="/userplaylist" exact component={UserPlayList} />
                <Route path="/search/:value" exact component={Search} />
            </Switch>
        </div>
    )
};

export default Main;