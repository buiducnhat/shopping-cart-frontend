import axios from 'axios';
import jsCookie from 'js-cookie';
import {createSlice, createAsyncThunk, current} from '@reduxjs/toolkit';

export const getCart = createAsyncThunk('cart/getCart', (params, {rejectWithValue}) => {
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
});

export const addToCart = createAsyncThunk('cart/addToCart', (params, {rejectWithValue}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/carts`;
            const accessToken = jsCookie.get('access-token');
            const {productId, quantity} = params;

            const response = await axios.post(url, {productId, quantity}, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            return resolve(response.data);
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                return reject(rejectWithValue(error.response.data));
            }
            return reject(error);
        }
    })
})

export const saveCart = createAsyncThunk('cart/saveCart', (params, {rejectWithValue}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/carts`;
            const accessToken = jsCookie.get('access-token');
            const {newItems} = params;

            const response = await axios.put(url, {items: newItems}, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            return resolve(response.data);
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                return reject(rejectWithValue(error.response.data));
            }
            return reject(error);
        }
    })
});

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        total: 0,
        getCartErrMsg: null,
        isPendingGetCart: false,

        isPendingSaveCart: false,
        saveCartErrMsg: null,

        addToCartErrMsg: null,
        isPendingAddToCart: false
    },
    reducers: {
        updateCart(state, action) {
            const newProduct = {...action.payload?.product};

            let newItems = [];
            for (let i = 0; i < current(state.items).length; i++) {
                newItems.push(current(state.items)[i]);
            }
            for (let i = 0; i < newItems.length; i++) {
                if (newItems[i].productId === newProduct.productId) {
                    state.total += newProduct.subTotal - newItems[i].subTotal;
                    newItems[i] = {...newProduct};
                    break;
                }
            }
            state.items = newItems;
        },
        removeItem(state, action) {
            state.total = state.total - state.items.find(item => item.productId === action.payload.productId).subTotal;
            state.items = state.items.filter(item => item.productId !== action.payload.productId);
        },
        clearCart(state, action) {
            state.items = [];
            state.total = 0;
        }
    },
    extraReducers: {
        // handle get cart
        [getCart.rejected]: (state, action) => {
            state.isPendingGetCart = false;
            state.getCartErrMsg = action.payload?.message || action.error.message;
        },
        [getCart.pending]: (state, action) => {
            state.isPendingGetCart = true;
        },
        [getCart.fulfilled]: (state, action) => {
            state.items = action.payload?.items || [];
            state.total = action.payload?.total || 0;
            state.getCartErrMsg = null;
            state.isPendingGetCart = false;
        },

        // handle save cart
        [saveCart.rejected]: (state, action) => {
            state.isPendingSaveCart = false;
            state.saveCartErrMsg = action.payload?.message || action.error.message;
        },
        [saveCart.pending]: (state, action) => {
            state.isPendingSaveCart = true;
        },
        [saveCart.fulfilled]: (state, action) => {
            state.isPendingSaveCart = false;
            state.saveCartErrMsg = null;
            // state.items = action.payload.items;
            // state.total = action.payload.total;
        },

        // handle add to cart
        [addToCart.rejected]: (state, action) => {
            state.isPendingAddToCart = false;
            state.addToCartErrMsg = action.payload?.message || action.error.message;
        },
        [addToCart.pending]: (state, action) => {
            state.isPendingAddToCart = true;
        },
        [addToCart.fulfilled]: (state, action) => {
            state.isPendingAddToCart = false;
            state.addToCartErrMsg = null;
            state.items = action.payload.items;
            state.total = action.payload.total;
        }
    }
});

export const {updateCart, removeItem, clearCart} = cartSlice.actions;

export default cartSlice.reducer;