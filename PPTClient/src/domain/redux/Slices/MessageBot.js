import { createSlice } from "@reduxjs/toolkit";
const initialState = [
  
]

export const MessageBotRedux = createSlice({
    name: 'user',
    initialState,
    reducers:{
        addMessage: (state, action)=>{
                state.push(action.payload)

        }
    }
})
export const {addMessage} = MessageBotRedux.actions;
export default MessageBotRedux.reducer;