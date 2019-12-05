import { REQUEST_COBA_DATA } from '../type/CobaType'
export const getCoba = (data) => {
    return {
        type: REQUEST_COBA_DATA,
        token: data
    }
}