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
    status:authStatus
    khaltiUrl:string|null,
    myOrders:MyOrderData[]
    myOrderDetails:OrderDetails[]
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
enum PaymentStatus{
    Paid="paid",
    Unpaid="unpaid",
    Pending="pending"
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
    Payment:OrderPaymentData
}


export interface OrderDetails {
    id:string,
    quantity:number,
    orderId:String,
    Product:Product,
    Order:MyOrderData


}