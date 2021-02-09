import {configureStore} from '@reduxjs/toolkit';
import productSlice from '../features/client/product/productSlice';
import authenticationSlice from '../features/authentication/authenticationSlice';
import cartSlice from '../features/client/cart/cartSlice';

export default configureStore({
    reducer: {
        productSlice: productSlice,
        authenticationSlice: authenticationSlice,
        cartSlice: cartSlice
    }
});
