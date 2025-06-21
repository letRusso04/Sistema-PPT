import { createSlice } from "@reduxjs/toolkit";

const initialState = [

]


export const UserVerified = createSlice({
    name: 'useVerified',
    initialState,
    reducers:{
        addUserVerified: (state, action)=>{
                const {nameUser, username, email} = action.payload
                state.nameUser = nameUser;
                state.username = username;
                state.email = email;
                state.push(action.payload)
        },
        changeEmail: (state, action)=>{
            state.email = action.payload;
        }
    }
})
export const {addUserVerified, changeEmail} = UserVerified.actions;
export default UserVerified.reducer;