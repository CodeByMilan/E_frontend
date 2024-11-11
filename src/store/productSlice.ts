import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductState } from "../storetypes/productTypes";
import { authStatus } from "../storetypes/storeTypes";
import { Product } from "../storetypes/productTypes";
import { AppDispatch } from "./store";
import API from "../http";

const initialState: ProductState = {
  product: [],
  status: authStatus.loading,
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct(state: ProductState, action: PayloadAction<Product[]>) {
      state.product = action.payload;
    },
    setStatus(state: ProductState, action: PayloadAction<authStatus>) {
      state.status = action.payload;
    },
  },
});
export const { setProduct, setStatus } = productSlice.actions;
export default productSlice.reducer;

export function fetchProducts() {
  return async function fetchProductsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(authStatus.loading));
    try {
      const response = await API.get("/product");
      if (response.status == 200) {
        const data = response.data;
        dispatch(setStatus(authStatus.success));
        dispatch(setProduct(data));
      } else {
        dispatch(setStatus(authStatus.error));
      }
    } catch (error) {
      dispatch(setStatus(authStatus.error));
    }
  };
}
