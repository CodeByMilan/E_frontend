//all the collection a slices 

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productSlice from "./productSlice";

const store =configureStore ({
    reducer: {
        auth:authSlice,
        products:productSlice
    }
})
export default store;
//type of gives the type of the reducere:disp
//this for useDispatcher()hooks

export type AppDispatch = typeof store.dispatch;

// export type RootState =typeof store.getState
//generic type :which means the type of the state can change 
//this is for useSelector()hook
export type RootState=ReturnType<typeof store.getState>