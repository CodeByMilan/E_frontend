import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductState } from "../storetypes/productTypes";
import { authStatus } from "../storetypes/storeTypes";
import { Product } from "../storetypes/productTypes";
import { AppDispatch } from "./store";
import API from "../http";
import { RootState } from "./store";

const initialState: ProductState = {
  product: [],
  status: authStatus.loading,
  singleProduct: null
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
    setSingleProduct(state: ProductState, action: PayloadAction<Product>) {
      state.singleProduct = action.payload;
    },
  },
});
export const { setProduct, setStatus, setSingleProduct } = productSlice.actions;
export default productSlice.reducer;

export function fetchProducts() {
  return async function fetchProductsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(authStatus.loading));
    try {
      const response = await API.get("/product");
      if (response.status == 200) {
        const { data } = response.data;
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

export function fetchProductById(productId: string) {
  return async function fetchProductByIdThunk(dispatch: AppDispatch, getState: () => RootState) {
    const state = getState();
    const existingProduct = state.products.product.find((product: Product) => product.id === productId)
      if(existingProduct){
        dispatch(setSingleProduct(existingProduct))
        dispatch(setStatus(authStatus.success))
        
      }
      else {
      dispatch(setStatus(authStatus.loading))
    try {
      const response = await API.get(`/product/${productId}`);
      if (response.status == 200) {
        const { data } = response.data;
        dispatch(setStatus(authStatus.success));
        dispatch(setSingleProduct(data));
        
      }
      else {
        dispatch(setStatus(authStatus.error));
      }
    }
    catch (error) {
      dispatch(setStatus(authStatus.error));
    }
  }
  }
}


