import {configureStore} from '@reduxjs/toolkit';
import productSlice from '../features/client/product/productSlice'

export default configureStore({
    reducer: {
        productSlice: productSlice
    }
});
