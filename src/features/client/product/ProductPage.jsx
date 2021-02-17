import React from 'react';
import {Route, Switch} from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import listRouters from '../../../app/listRouters';

const ProductPage = props => {

    return (
        <Switch>
            <Route path={listRouters.product} exact render={props => <ProductList {...props} />} />
            <Route path={listRouters.productDetail} render={props => <ProductDetail {...props} />} />
        </Switch>
    );
}

export default ProductPage;