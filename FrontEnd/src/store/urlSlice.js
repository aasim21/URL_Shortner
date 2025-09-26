import { createSlice } from "@reduxjs/toolkit";


const urlSlice = createSlice({
    name:'Short_URL',
    initialState:'',
    reducers:{
        Get_ShortURL:(state, action) =>{
            if(action.payload)
            state = action.payload;
            return state;
        }
    }
});

export const URLActions = urlSlice.actions;
export default urlSlice;

