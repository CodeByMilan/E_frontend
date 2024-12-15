import { Product } from "./productTypes"
import { authStatus } from "./storeTypes"

export enum PaymentMethod{
    cod="cod",
    khalti="khalti"
}
export interface ItemDetails{
    productId:string,
    quantity:number

}

export  interface OrderResponseItem extends ItemDetails{
    orderId:string
}
export interface OrderData{
    phoneNumber:string
    shippingAddress:string,
    totalAmount:number,
    paymentDetails:{
        paymentMethod:PaymentMethod
    },
    items:ItemDetails[]
}

export interface OrderResponseData{
    items:OrderResponseItem[],
    checkoutStatus:authStatus,
    khaltiUrl:string|null,
    myOrders:MyOrderData[],
    myOrderDetails:OrderDetails[],
    status:authStatus
}
export enum OrderStatus{
    Pending="pending",
    Delivered="delivered",
    Cancelled="cancelled",
    Ontheway="ontheWay",
    Preparation="preparation",
    all="all"

}

interface Payment{
    paymentMethod:PaymentMethod,   
}
 export enum PaymentStatus{
    paid="paid",
    unpaid="unpaid",
}

interface OrderPaymentData extends Payment{
    paymentStatus:PaymentStatus

}

interface UserData{
    username:string,
    email:string
}
export interface MyOrderData{
    id:string,
    phoneNumber:string,
    shippingAddress:string,
    totalAmount:number,
    orderStatus:OrderStatus,
    createdAt:string,
    paymentId:string,
    userId:UserData
    Payment:OrderPaymentData,
    User:User
}

interface User{
    email:string,
    username:string
}
export interface OrderDetails {
    id:string,
    quantity:number,
    orderId:String,
    Product:Product,
    Order:MyOrderData
    


}