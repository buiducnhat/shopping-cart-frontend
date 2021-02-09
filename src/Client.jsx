import React from 'react';
import {Route, Switch} from 'react-router-dom';
import ProductList from './features/client/product/ProductList';
import Cart from './features/client/cart/Cart';
import Account from './features/client/account/Account';
import Login from './features/authentication/Login';
import Header from './components/Header';
import listRouters from './app/listRouters';

const Client = props => {
    return (
        <React.Fragment>
            <Header />
            <Switch>
                <Route path={listRouters.product} render={props => <ProductList {...props} />} />
                <Route path={listRouters.cart} render={props => <Cart {...props} />} />
                <Route path={listRouters.account} render={props => <Account {...props} />} />
                <Route path={listRouters.login} render={props => <Login {...props} />} />
            </Switch>
        </React.Fragment>
    );
}

export default Client;