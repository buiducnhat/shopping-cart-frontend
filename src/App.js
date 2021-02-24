import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Client from './Client';
import Admin from './Admin';
import {useDispatch} from 'react-redux';
import {getUserData} from './features/authentication/authenticationSlice';
import {getCart} from './features/client/cart/cartSlice';
import listRouters from './app/listRouters';
import './App.css';

function App() {
    const dispatch = useDispatch();
    localStorage.getItem('access-token') && dispatch(getUserData()) && dispatch(getCart());

    return (
        <Switch>
            <Route path={listRouters.clientEndpoint} render={props => <Client {...props} />} />
            <Route path={listRouters.adminEndpoint} render={props => <Admin {...props} />} />
        </Switch>
    );
}

export default App;