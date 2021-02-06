import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Client from './Client';
import './App.css';

require('dotenv').config()

function App() {
    return (
        <Switch>
            <Route path='/' render={props => <Client {...props} />} />
        </Switch>
    );
}

export default App;