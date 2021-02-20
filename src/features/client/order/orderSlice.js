import axios from 'axios';
import jsCookie from 'js-cookie';
import {createSlice, createAsyncThunk, current} from '@reduxjs/toolkit';

export const getOrdersOfUser = createAsyncThunk('order/getOrdersOfUser', (params, {rejectWithValue}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/orders`;
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

export const completeOrder = createAsyncThunk('order/completeOrder', (params, {rejectWithValue}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/orders/complete/${params.orderId}`;
            const accessToken = jsCookie.get('access-token');
            const response = await axios.post(url, {}, {
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

export const cancelOrder = createAsyncThunk('order/cancelOrder', (params, {rejectWithValue}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/orders/cancel/${params.orderId}`;
            const accessToken = jsCookie.get('access-token');
            const response = await axios.post(url, {}, {
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

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],

        isPendingGetOrdersOfUser: false,
        getOrdersOfUserErrMsg: null,

        isPendingCompleteOrder: false,
        completeOrderErrMsg: null,

        isPendingCancelOrder: false,
        cancelOrderErrMsg: null
    },
    reducers: {

    },
    extraReducers: {
        // handle get orders
        [getOrdersOfUser.rejected]: (state, action) => {
            state.isPendingGetOrdersOfUser = false;
            state.getOrdersOfUserErrMsg = action.payload?.message || action.error.message;
        },
        [getOrdersOfUser.pending]: (state, action) => {
            state.isPendingGetOrdersOfUser = true;
        },
        [getOrdersOfUser.fulfilled]: (state, action) => {
            state.orders = action.payload || [];
            state.getOrdersOfUserErrMsg = null;
            state.isPendingGetOrdersOfUser = false;
        },

        // handle complete order
        [completeOrder.rejected]: (state, action) => {
            state.isPendingCompleteOrder = false;
            state.completeOrderErrMsg = action.payload?.message || action.error.message;
        },
        [completeOrder.pending]: (state, action) => {
            state.isPendingCompleteOrder = true;
        },
        [completeOrder.fulfilled]: (state, action) => {
            const orderToUpdate = {...action.payload};
            let curOrders = [];
            for (let i = 0, len = current(state.orders).length; i < len; ++i) {
                curOrders.push(current(state.orders)[i]);
            }
            curOrders = curOrders.map(order => {
                const tempOrder = Object.assign({}, order);
                if (tempOrder.id === orderToUpdate._id) {
                    tempOrder.status = orderToUpdate.status;
                    tempOrder.updatedAt = orderToUpdate.updatedAt;
                }
                return tempOrder;
            });

            state.orders = curOrders;
            state.completeOrderErrMsg = null;
            state.isPendingCompleteOrder = false;
        },

        // handle cancel order
        [cancelOrder.rejected]: (state, action) => {
            state.isPendingCancelOrder = false;
            state.cancelOrderErrMsg = action.payload?.message || action.error.message;
        },
        [cancelOrder.pending]: (state, action) => {
            state.isPendingCancelOrder = true;
        },
        [cancelOrder.fulfilled]: (state, action) => {
            const orderToUpdate = {...action.payload};
            let curOrders = [];
            for (let i = 0, len = current(state.orders).length; i < len; ++i) {
                curOrders.push(current(state.orders)[i]);
            }
            curOrders = curOrders.map(order => {
                const tempOrder = Object.assign({}, order);
                if (tempOrder.id === orderToUpdate._id) {
                    tempOrder.status = orderToUpdate.status;
                    tempOrder.updatedAt = orderToUpdate.updatedAt;
                }
                return tempOrder;
            });

            state.orders = curOrders;
            state.cancelOrderErrMsg = null;
            state.isPendingCancelOrder = false;
        }
    }
});

// export const { } = orderSlice.actions;

export default orderSlice.reducer;