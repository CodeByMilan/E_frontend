import { Product } from "./productTypes";
import { authStatus } from "./storeTypes";


export interface CartItem{
    Product:Product,
    quantity: number
}

export interface cartState{
    items:CartItem[],
    status:authStatus,

}