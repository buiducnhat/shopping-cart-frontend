import {createSlice} from '@reduxjs/toolkit';
import listRouters from '../../../app/listRouters';

export const linkSlice = createSlice({
    name: 'link',
    initialState: {
        activeLink: listRouters.home
    },
    reducers: {
        setActiveLink(state, action){
            state.activeLink = action.payload;
        }
    }
});

export const {setActiveLink} = linkSlice.actions;

export default linkSlice.reducer;