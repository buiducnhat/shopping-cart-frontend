import React from 'react';
import {Route, Switch} from 'react-router-dom';
import ProductList from './features/client/product/ProductList';
import ProductDetail from './features/client/product/ProductDetail';
import Cart from './features/client/cart/Cart';
import Checkout from './features/client/checkout/Checkout';
import Order from './features/client/order/Order';
import Account from './features/client/account/Account';
import Login from './features/authentication/Login';
import SignUp from './features/authentication/SignUp';
import Header from './components/Header';
import Footer from './components/Footer';
import listRouters from './app/listRouters';

const Client = props => {
    return (
        <React.Fragment>
            <Header />
            <Switch>
                <Route path={listRouters.productDetail} render={props => <ProductDetail {...props} />} />
                <Route path={listRouters.product} render={props => <ProductList {...props} />} />
                <Route path={listRouters.home} render={props => <ProductList {...props} />} />
                <Route path={listRouters.account} render={props => <Account {...props} />} />
                <Route path={listRouters.login} render={props => <Login {...props} />} />
                <Route path={listRouters.signUp} render={props => <SignUp {...props} />} />
                <Route path={listRouters.cart} render={props => <Cart {...props} />} />
                <Route path={listRouters.checkout} render={props => <Checkout {...props} />} />
                <Route path={listRouters.order} render={props => <Order {...props} />} />
                <Route path={listRouters.clientEndpoint} render={props => <ProductList {...props} />} />
            </Switch>
            <Footer />
        </React.Fragment>
    );
}

export default Client;