import { REQUEST_MYPRODUCT_DATA } from '../type/MyproductType'
export const getMyproduct = (data) => {
    return {
        type: REQUEST_MYPRODUCT_DATA,
        token: data
    }
}