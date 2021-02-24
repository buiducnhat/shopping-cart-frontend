import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchListProducts = createAsyncThunk('products/fetchListProducts', (params, {rejectWithValue}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const serverUrl = process.env.REACT_APP_SERVER_URL;
            let {pageNumber, sortType} = params;

            let url = `${serverUrl}/products/?page=${pageNumber}&sort=${sortType}`;

            let result = await axios.get(url);

            return resolve(result.data);
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                return reject(rejectWithValue(error.response.data));
            }
            return reject(error);
        }
    });
});

export const fetchDetailProduct = createAsyncThunk('products/fetchDetailProduct', (params, {rejectWithValue}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const serverUrl = process.env.REACT_APP_SERVER_URL;
            const {productId} = params;

            let url = `${serverUrl}/products/${productId}`;

            let result = await axios.get(url);

            return resolve(result.data);
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                return reject(rejectWithValue(error.response.data));
            }
            return reject(error);
        }
    });
});

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        total: 0,
        isPendingFetchListProducts: true,
        fetchListProductsErrMsg: null,

        currentProduct: {},
        isPendingFetchDetailProduct: false,
        fetchDetailProductErrMsg: null
    },
    reducers: {
        setCurrentProduct(state, action) {
            state.currentProduct = state.products.find(product => product._id === action.payload?.productId);
        }
    },
    extraReducers: {
        // handle fetchListProducts
        [fetchListProducts.rejected]: (state, action) => {
            state.isPendingFetchListProducts = false;
            state.fetchListProductsErrMsg = action.error?.message || action.payload?.message;
        },
        [fetchListProducts.pending]: (state) => {
            state.isPendingFetchListProducts = true;
        },
        [fetchListProducts.fulfilled]: (state, action) => {
            state.isPendingFetchListProducts = false;
            state.fetchListProductsErrMsg = null;
            state.products = action.payload.data;
            state.total = action.payload.total;
        },

        // handle fetchDetailProduct
        [fetchDetailProduct.rejected]: (state, action) => {
            state.isPendingFetchDetailProduct = false;
            state.fetchDetailProductErrMsg = action.error?.message || action.payload?.message;
        },
        [fetchDetailProduct.pending]: (state, action) => {
            state.isPendingFetchDetailProduct = true;
        },
        [fetchDetailProduct.fulfilled]: (state, action) => {
            state.fetchDetailProductErrMsg = null;
            state.isPendingFetchDetailProduct = false;
            state.currentProduct = action.payload;
        }
    }
});

export const {setCurrentProduct} = productSlice.actions;

export default productSlice.reducer;