import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
    'authentication/login',
    (params, {rejectWithValue}) => {
        return new Promise(async (resolve, reject) => {
            try {
                const serverUrl = process.env.REACT_APP_SERVER_URL;

                let url = `${serverUrl}/users/login`;

                let data = JSON.stringify({
                    email: params.email,
                    password: params.password
                });
                let result = await axios.post(url, data, {
                    headers: {'Content-Type': 'application/json'}
                });

                return resolve(result.data);
            } catch (error) {
                if (error.response) {
                    return reject(rejectWithValue(error.response.data));
                }
                return reject(error);
            }
        });
    }
);

export const getUserData = createAsyncThunk(
    'authentication/getUserData',
    (params, {rejectWithValue}) => {
        return new Promise(async (resolve, reject) => {
            try {
                const serverUrl = process.env.REACT_APP_SERVER_URL;
                let url = `${serverUrl}/users/`;

                const accessToken = localStorage.getItem('access-token');
                if (!accessToken) {
                    return resolve(null);
                }

                const headers = {
                    Authorization: 'Bearer ' + accessToken
                };
                const response = await axios.get(url, {headers: headers});
                return resolve(response.data);
            } catch (error) {
                if (error.response) {
                    console.log(error.response)
                    return reject(rejectWithValue(error.response.data));
                }
                return reject(error);
            }
        });
    }
);

export const signUp = createAsyncThunk(
    'authentication/signUp',
    (params, {rejectWithValue}) => {
        return new Promise(async (resolve, reject) => {
            try {
                const serverUrl = process.env.REACT_APP_SERVER_URL;

                let url = `${serverUrl}/users/signup`;

                let data = JSON.stringify({
                    email: params.email,
                    name: params.name,
                    phoneNumber: params.phoneNumber,
                    address: params.address,
                    password: params.password
                });
                let result = await axios.post(url, data, {
                    headers: {'Content-Type': 'application/json'}
                });

                return resolve(result.data);
            } catch (error) {
                if (error.response) {
                    return reject(rejectWithValue(error.response.data));
                }
                return reject(error);
            }
        });
    }
);

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        loginErrMsg: null,
        isLoggedIn: false,
        isPendingLogin: false,

        signUpErrMsg: null,
        isPendingSignUp: false,

        getUserDataErrMsg: null,
        userData: null,
        isPendingGetUserData: false
    },
    reducers: {
        logout(state, action) {
            state.loginErrMsg = null;
            state.getUserDataErrMsg = null;
            state.userData = null;
            state.isLoggedIn = false;
            localStorage.setItem('access-token', null);
        }
    },
    extraReducers: {
        // login handle
        [login.rejected]: (state, action) => {
            state.isPendingLogin = false;
            state.isLoggedIn = false;
            state.userData = null;
            state.loginErrMsg = action.payload.message;
            localStorage.setItem('access-token', null);
        },
        [login.pending]: (state) => {
            state.isLoggedIn = false;
            state.isPendingLogin = true;
        },
        [login.fulfilled]: (state, action) => {
            state.isPendingLogin = false;
            state.isLoggedIn = true;
            state.userData = {...action.payload?.userData, accessToken: action.payload.accessToken};
            state.loginErrMsg = null;
            localStorage.setItem('access-token', action.payload.accessToken);
        },

        // signup handle
        [signUp.rejected]: (state, action) => {
            state.isPendingSignUp = false;
            state.isLoggedIn = false;
            state.userData = null;
            state.signUpErrMsg = action.payload.message;
            localStorage.setItem('access-token', null);
        },
        [signUp.pending]: (state) => {
            state.isLoggedIn = false;
            state.signUpErrMsg = null;
            state.isPendingSignUp = true;
        },
        [signUp.fulfilled]: (state, action) => {
            state.isPendingSignUp = false;
            state.isLoggedIn = true;
            state.userData = {...action.payload?.userData, accessToken: action.payload.accessToken};
            state.signUpErrMsg = null;
            localStorage.setItem('access-token', action.payload.accessToken);
        },

        // getUserData handle
        [getUserData.rejected]: (state, action) => {
            state.isPendingGetUserData = false;
            state.getUserDataErrMsg = action.payload?.message;
        },
        [getUserData.pending]: (state) => {
            state.isPendingGetUserData = true;
        },
        [getUserData.fulfilled]: (state, action) => {
            if (action.payload) {
                state.isLoggedIn = true;
                state.userData = action.payload;
                state.getUserDataErrMsg = null;
                state.isPendingGetUserData = false;
            } else {
                state.getUserDataErrMsg = null;
                state.isPendingGetUserData = false;
            }
        }
    }
});

export const {logout} = authenticationSlice.actions;

export default authenticationSlice.reducer;
