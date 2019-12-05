import { REQUEST_CART_DATA } from '../type/CartType'
export const getCart = (data) => {
    return {
        type: REQUEST_CART_DATA,
        token: data
    }
}