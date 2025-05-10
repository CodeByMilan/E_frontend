//all the collection a slices 

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import checkoutSlice from "./checkoutSlice";
import productSlice from "./productSlice";
import searchSlice from "./searchSlice";

const store =configureStore ({
    reducer: {
        auth:authSlice,
        products:productSlice,
        cart:cartSlice,
        order:checkoutSlice,
        search:searchSlice
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