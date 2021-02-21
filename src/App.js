import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Client from './Client';
import Admin from './Admin';
import listRouters from './app/listRouters';
import './App.css';

require('dotenv').config()

function App() {
    return (
        <Switch>
            <Route path={listRouters.clientEndpoint} render={props => <Client {...props} />} />
            <Route path={listRouters.adminEndpoint} render={props => <Admin {...props} />} />
        </Switch>
    );
}

export default App;