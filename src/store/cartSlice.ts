import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, cartState } from "../storetypes/cartTypes";
import { authStatus } from "../storetypes/storeTypes";
import { AppDispatch } from "./store";
import { APIAuthenticated } from "../http";

const initialState: cartState = {
  items: [],
  status: authStatus.loading,
};
interface DeleteAction{
  productId:string
}
interface UpdateAction extends DeleteAction{
  quantity:number,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems(state: cartState, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    setStatus(state: cartState, action: PayloadAction<authStatus>) {
      state.status = action.payload;
    },
    setDeleteItem(state:cartState,action:PayloadAction<DeleteAction>){
      const index =state.items.findIndex(item=>item.Product.id=action.payload.productId)
      state.items.splice(index,1)
    },
    setUpdateItem(state:cartState,action:PayloadAction<UpdateAction>){
      const index =state.items.findIndex(item=>item.Product.id=action.payload.productId)
      if(index!==-1){
      state.items[index].quantity=action.payload.quantity
    }
  }
  },
});
export const { setItems, setStatus,setDeleteItem,setUpdateItem } = cartSlice.actions;
export default cartSlice.reducer;

export function addToCart(productId: string) {
  return async function addToCartThunk(dispatch: AppDispatch) {
    dispatch(setStatus(authStatus.loading));
    try {
      const response = await APIAuthenticated.post("/customer/cart", {
        productId,
        quantity: 1,
      });
      if (response.status == 200) {
      
        //response.data means data response and data means the key inside the response
        dispatch(setItems(response.data.data));
        dispatch(setStatus(authStatus.success));
      } else {
        dispatch(setStatus(authStatus.error));
      }
    } catch (error) {
      dispatch(setStatus(authStatus.error));
    }
  };
}

export function fetchCartItems() {
  return async function fetchCartItemsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(authStatus.loading));
    try {
      const response = await APIAuthenticated.get("/customer/cart");
      if (response.status == 200) {
        dispatch(setStatus(authStatus.success));

        dispatch(setItems(response.data.data));
      } else {
        dispatch(setStatus(authStatus.error));
      }
    } catch (error) {
      dispatch(setStatus(authStatus.error));
    }
  };
}
export function deleteCartItem(productId:string) {
  return async function deleteCartItemsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(authStatus.loading));
    try {
      const response = await APIAuthenticated.delete("/customer/cart/"+productId);
      if (response.status == 200) {
        dispatch(setStatus(authStatus.success));

        dispatch(setDeleteItem({productId}));
      } else {
        dispatch(setStatus(authStatus.error));
      }
    } catch (error) {
      dispatch(setStatus(authStatus.error));
    }
  };
}
export function updateCartItem(productId:string,quantity:number) {
  return async function updateCartItemThunk(dispatch: AppDispatch) {
    dispatch(setStatus(authStatus.loading));
    try {
      const response = await APIAuthenticated.patch("/customer/cart/"+productId,{
        quantity
      })
      if (response.status == 200) {
        dispatch(setStatus(authStatus.success));

        dispatch(setUpdateItem({productId,quantity}));
      } else {
        dispatch(setStatus(authStatus.error));
      }
    } catch (error) {
      dispatch(setStatus(authStatus.error));
    }
  };
}
