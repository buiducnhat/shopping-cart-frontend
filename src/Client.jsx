import React from 'react';
import {Route, Switch} from 'react-router-dom';
import ProductList from './features/client/product/ProductList';
import Header from './components/Header'

const Client = (props) => {
    return (
        <React.Fragment>
            <Header />
            <Switch>
                <Route path='/products' render={(props) => <ProductList {...props} />} />
            </Switch>
        </React.Fragment>
    );
}

export default Client;