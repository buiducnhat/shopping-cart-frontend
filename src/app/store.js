import {configureStore} from '@reduxjs/toolkit';
import productSlice from '../features/client/product/productSlice';
import authenticationSlice from '../features/authentication/authenticationSlice';
import cartSlice from '../features/client/cart/cartSlice';
import orderSlice from '../features/client/order/orderSlice';

export default configureStore({
    reducer: {
        productSlice: productSlice,
        authenticationSlice: authenticationSlice,
        cartSlice: cartSlice,
        orderSlice: orderSlice
    }
});
