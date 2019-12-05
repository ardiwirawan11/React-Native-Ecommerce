import { REQUEST_LOGIN } from '../type/LoginType'
export const postLogin = (data) => {
    return {
        type: REQUEST_LOGIN,
        data: data
    }
}