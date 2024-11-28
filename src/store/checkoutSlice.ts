import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authStatus } from "../storetypes/storeTypes";
import {
    MyOrderData,
  OrderData,
  OrderDetails,
  OrderResponseData,
  OrderResponseItem,
  OrderStatus,
} from "../storetypes/checkoutTypes";
import { AppDispatch } from "./store";
import { APIAuthenticated } from "../http";

const initialState: OrderResponseData = {
  items: [],
  status: authStatus.loading,
  khaltiUrl: null,
  myOrders:[],
  myOrderDetails:[]

};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder(
      state: OrderResponseData,
      action: PayloadAction<OrderResponseItem>
    ) {
      state.items.push(action.payload);
    },

    setMyOrders(
        state: OrderResponseData,
        action: PayloadAction<MyOrderData[]>
      ) {
        state.myOrders=action.payload;
      },
    setStaus(state: OrderResponseData, action: PayloadAction<authStatus>) {
      state.status = action.payload;
    },
    setKhaltiUrl(
      state: OrderResponseData,
      action: PayloadAction<OrderResponseData["khaltiUrl"]>
    ) {
      state.khaltiUrl = action.payload;
    },
    setMyOrderDetails(
      state: OrderResponseData,
      action: PayloadAction<OrderDetails[]>
    ) {
      state.myOrderDetails=action.payload;
    },
    updateOrderStatus(state:OrderResponseData, action:PayloadAction<{status:OrderStatus,orderId:string}>){
      //console.log("Debugging updateOrderStatus",action.payload);
      const status = action.payload.status 
      const orderId = action.payload.orderId
      const updatedOrder = state.myOrders.map(order=>order.id == orderId ? {...order,orderStatus : status} : order)
      state.myOrders = updatedOrder
  }
  },
});

export const { setOrder, setStaus, setKhaltiUrl ,setMyOrders,setMyOrderDetails,updateOrderStatus} = orderSlice.actions;
export default orderSlice.reducer;

export function orderItem(data: OrderData) {
  console.log("Dispatching action with data:", data);
  return async function orderItemThunk(dispatch: AppDispatch) {
    console.log("Dispatching action with data:", data);
    dispatch(setStaus(authStatus.loading));
    try {
      const response = await APIAuthenticated.post("/order", data);
      if ((response.status = 200)) {
        dispatch(setStaus(authStatus.success));
        dispatch(setOrder(response.data.data));
        if (response.data.url) {
          dispatch(setKhaltiUrl(response.data.url));
        } else {
          dispatch(setKhaltiUrl(null));
        }
      } else {
        dispatch(setStaus(authStatus.error));
      }
    } catch (error) {
      dispatch(setStaus(authStatus.error));
    }
  };
}
export function fetchMyOrders() {
    return async function fetchMyOrdersThunk(dispatch: AppDispatch) {
      dispatch(setStaus(authStatus.loading));
      try {
        const response = await APIAuthenticated.get("/order/customer");
        if ((response.status = 200)) {
          dispatch(setStaus(authStatus.success));
          dispatch(setMyOrders(response.data.data));
        } else {
          dispatch(setStaus(authStatus.error));
        }
      } catch (error) {
        dispatch(setStaus(authStatus.error));
      }
    };
  }
  export function fetchMyOrderDetails(id:string) {
    return async function fetchMyOrderDetailsThunk(dispatch: AppDispatch) {
      dispatch(setStaus(authStatus.loading));
      try {
        const response = await APIAuthenticated.get(`/order/customer/${id}`);
        if ((response.status = 200)) {
          dispatch(setStaus(authStatus.success));
          dispatch(setMyOrderDetails(response.data.data));
        } else {
          dispatch(setStaus(authStatus.error));
        }
      } catch (error) {
        dispatch(setStaus(authStatus.error));
      }
    };
  }
  export function updateOrderStatusInStore(data:any){
    return async function updateOrderStatusInStoreThunk(dispatch: AppDispatch) {
      dispatch(updateOrderStatus(data))
  }
}