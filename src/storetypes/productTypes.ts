import { authStatus } from "./storeTypes"

interface User {
    id:string,
    email:string,
    username:string
}
interface Category{
    id:string,
    categoryName:string
}

export interface Product{
    id:string,
    productName:string,
    description:string,
    price:number,
    productImageUrl:string,
    productQuantity:number,
    createdAt:string,
    updatedAt:string,
    categoryId:string,
    userId:string,
    User:User,
    Category:Category
}
export interface ProductState{
    product:Product[],
    status:authStatus
}