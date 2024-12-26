import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authStatus } from "../storetypes/storeTypes";
import {
    MyOrderData,
  OrderData,
  OrderDetails,
  OrderResponseData,
  OrderResponseItem,
  OrderStatus,
  PaymentStatus,
} from "../storetypes/checkoutTypes";
import { AppDispatch } from "./store";
import { API, APIAuthenticated } from "../http";

const initialState: OrderResponseData = {
  items: [],
  status:authStatus.loading,
  checkoutStatus: authStatus.loading,
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
    setCheckoutStaus(state: OrderResponseData, action: PayloadAction<authStatus>) {
      state.checkoutStatus = action.payload;
    },
    setStatus(state: OrderResponseData, action: PayloadAction<authStatus>) {
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
  },
  updatePaymentStatus(
    state: OrderResponseData,
    action: PayloadAction<{ status: PaymentStatus; orderId: string }>
  ) {
      console.log("Debugging paymentStatusUpdate",action.payload);
    const { status, orderId } = action.payload;
    const updatedOrders = state.myOrders.map((order) => {
      if (order.id === orderId) {
        return {
          ...order,
          Payment: {
            ...order.Payment,
            paymentStatus: status,
          },
        };
      }
      return order;
    });
    state.myOrders = updatedOrders;
  }
  },
});

export const { setOrder, setCheckoutStaus,setStatus, setKhaltiUrl ,setMyOrders,setMyOrderDetails,updateOrderStatus,updatePaymentStatus} = orderSlice.actions;
export default orderSlice.reducer;

export function orderItem(data: OrderData) {
  //console.log("Dispatching action with data:", data);
  return async function orderItemThunk(dispatch: AppDispatch) {
   // console.log("Dispatching action with data:", data);
    dispatch(setCheckoutStaus(authStatus.loading));
    try {
      const response = await APIAuthenticated.post("/order", data);
      if ((response.status = 200)) {
        dispatch(setOrder(response.data.data));
        dispatch(setCheckoutStaus(authStatus.success));
        
        if (response.data.url) {
          dispatch(setKhaltiUrl(response.data.url));
        } else {
          dispatch(setKhaltiUrl(null));
        }
      } else {
        dispatch(setCheckoutStaus(authStatus.error));
      }
    } catch (error) {
      dispatch(setCheckoutStaus(authStatus.error));
    }
  };
}
export function fetchMyOrders() {
    return async function fetchMyOrdersThunk(dispatch: AppDispatch) {
      dispatch(setStatus(authStatus.loading));
      try {
        const response = await APIAuthenticated.get("/order/customer");
        if ((response.status = 200)) {
          dispatch(setStatus(authStatus.success));
          dispatch(setMyOrders(response.data.data));
        } else {
          dispatch(setStatus(authStatus.error));
        }
      } catch (error) {
        dispatch(setStatus(authStatus.error));
      }
    };
  }
  export function fetchMyOrderDetails(id:string) {
    return async function fetchMyOrderDetailsThunk(dispatch: AppDispatch) {
      dispatch(setStatus(authStatus.loading));
     
      try {
        const response = await APIAuthenticated.get(`/order/customer/${id}`);
    
        if ((response.status = 200)) {
         
          dispatch(setStatus(authStatus.success));
          dispatch(setMyOrderDetails(response.data.data));
        } else {
          dispatch(setStatus(authStatus.error));
        }
      } catch (error) {
        dispatch(setStatus(authStatus.error));
      }
    };
  }
  export function updateOrderStatusInStore(data:any){
    return async function updateOrderStatusInStoreThunk(dispatch: AppDispatch) {
      dispatch(updateOrderStatus(data))
  }
}
export function updatePaymentStatusInStore(data:any){
  return async function updatePaymentStatusInStoreThunk(dispatch: AppDispatch) {
    dispatch(updatePaymentStatus(data))
}
}
export function  verifyPaymentStatus(pidx:string){
  return async function verifyPaymentStatusThunk(dispatch:AppDispatch) {
    console.log(pidx)
    dispatch(setStatus(authStatus.loading));
    try {
      const response = await APIAuthenticated.post(`/order/verify`,{pidx});
      if ((response.status = 200)) {
       // console.log(response.data)
        dispatch(setStatus(authStatus.success));
      } else {
        dispatch(setStatus(authStatus.error));
      }
    } catch (error) {
      dispatch(setStatus(authStatus.error));
    }
  };
}
    
