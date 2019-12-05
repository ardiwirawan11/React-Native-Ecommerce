import { REQUEST_UPDATE } from '../type/UpdateType'
export const UpdateMerchant = (id, token, data) => {
    return {
        type: REQUEST_UPDATE,
        id: id,
        token: token,
        data: data
       
    }
}