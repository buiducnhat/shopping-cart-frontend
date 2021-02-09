import axios from 'axios';
import jsCookie from 'js-cookie';
import {createSlice, createAsyncThunk, current} from '@reduxjs/toolkit';

export const getItemsInCart = createAsyncThunk('cart/getItemsInCart', (params, {rejectWithValue}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/carts`;
            const accessToken = jsCookie.get('access-token');
            const response = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            return resolve(response.data);
        } catch (error) {
            if (error.response) {
                return reject(rejectWithValue(error.response.data));
            }
            return reject(error);
        }
    })
})

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        total: 0,
        getItemsInCartErrMsg: null,
        isPendingGetItemsInCart: false
    },
    reducers: {
        updateCart(state, action) {
            const newProduct = {...action.payload?.product};
            // newProduct.subTotal = newProduct.salePrice * newProduct.quantity;
            console.log('new product', newProduct);

            let a = [];
            for (let i = 0; i < current(state.items).length; i++) {
                a.push(current(state.items)[i]);
            }
            for (let i = 0; i < a.length; i++) {
                if (a[i].productId === newProduct.productId) {
                    a[i] = {...newProduct};
                    break;
                }
            }

            state.items = a;
        }
    },
    extraReducers: {
        [getItemsInCart.rejected]: (state, action) => {
            state.isPendingGetItemsInCart = false;
            state.getItemsInCartErrMsg = action.payload?.message || action.error.message;
        },
        [getItemsInCart.pending]: (state, action) => {
            state.isPendingGetItemsInCart = true;
        },
        [getItemsInCart.fulfilled]: (state, action) => {
            state.getItemsInCartErrMsg = null;
            state.isPendingGetItemsInCart = null;
            state.items = action.payload.items;
            state.total = action.payload.total;
        }
    }
});

export const {updateCart} = cartSlice.actions;

export default cartSlice.reducer;