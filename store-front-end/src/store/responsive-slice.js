import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarShow: 'responsive'
}

const responsiveSlice = createSlice({
    name:'responsive',
    initialState,
    reducers:{
        changeState(state , action){
            state.sidebarShow = action.payload.sidebarShow;
        }
    },
});

export default responsiveSlice;