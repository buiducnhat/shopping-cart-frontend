import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios'

export const fetchListProducts = createAsyncThunk('products/fetchList', (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            // const serverUrl = process.env.SERVER_URL;
            const serverUrl = `http://localhost:1234`;
            let {pageNumber, sortType} = params;

            let url = `${serverUrl}/products/?page=${pageNumber}&sort=${sortType}`;

            let result = await axios.get(url);
            console.log(result.data);
            return resolve(result.data);
        } catch (error) {
            return reject(error);
        }
    })
})

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        isPendingProducts: true,
        errMsg: null
    },
    reducers: {
    },
    extraReducers: {
        [fetchListProducts.rejected]: (state, action) => {
            state.errMsg = action.error.message
        },
        [fetchListProducts.pending]: (state) => {
            state.isPendingProducts = true;
        },
        [fetchListProducts.fulfilled]: (state, action) => {
            state.isPendingProducts = false;
            state.products = action.payload;
        }
    }
});



export const { } = productSlice.actions;

export default productSlice.reducer;