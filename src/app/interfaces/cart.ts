import { Product } from "./product";

export interface Cart{
    _id ?: string , 
    product? : Product,
    count?:number,
    price?:number
}