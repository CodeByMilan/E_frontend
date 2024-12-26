import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface SearchQuery{
    searchQuery:string
}

const initialState:SearchQuery={
    searchQuery:"",
}

const searchSlice = createSlice({
    name:"search",
    initialState,
    reducers:{
        setSearchQuery(state:SearchQuery,action:PayloadAction<string>){
            state.searchQuery=action.payload;
        }
    }
})
export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;