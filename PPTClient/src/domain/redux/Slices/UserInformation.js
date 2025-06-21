import { createSlice } from "@reduxjs/toolkit";
const initialState = [
  
]

export const UserVerify = createSlice({
    name: 'user',
    initialState,
    reducers:{
        addUser: (state, action)=>{
                state.push(action.payload)

        }
    }
})
export const {addUser} = UserVerify.actions;
export default UserVerify.reducer;