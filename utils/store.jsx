import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice";
import blogSlice from "./blogSlice";
import generalSlice from "./generalSlice";

const store = configureStore({
    reducer:{
        user:userSlice,
        blog:blogSlice,
        general:generalSlice
    }
})

export default store;