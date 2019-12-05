import {REQUEST_CART_DATA, SHOW_CART_DATA, FAILED_GET_CART_DATA, SUCCESS_CART_DATA} from '../type/CartType'
const initialState = {
    loading: true,
    data: [],
    message: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_CART_DATA:
            return {
                ...state,
                loading: true
            }
        case SHOW_CART_DATA:
            console.log('show cart data', action)
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case FAILED_GET_CART_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case SUCCESS_CART_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        default:
            return state
    }
}