import { configureStore } from "@reduxjs/toolkit";
import  UserVerify from "./Slices/UserInformation";
import UserVerified from "./Slices/UserVerified";
import MessageBotRedux from "./Slices/MessageBot"
export const store = configureStore({
    reducer: {
        UserInformation: UserVerify,
        UserVerified: UserVerified,
        MessageBotRedux: MessageBotRedux
    }
});

