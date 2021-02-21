import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AdminProduct from './features/admin/product/AdminProduct';
import listRouters from './app/listRouters';

const Admin = props => {
    return (
        <React.Fragment>
            <Switch>
                <Route path={listRouters.adminProduct} render={props => <AdminProduct {...props} />} />
            </Switch>
        </React.Fragment>
    );
}

export default Admin;