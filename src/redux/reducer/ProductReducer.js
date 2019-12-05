import {REQUEST_PRODUCT_DATA, SHOW_PRODUCT_DATA, FAILED_GET_PRODUCT_DATA, SUCCESS_PRODUCT_DATA} from '../type/ProductType'
const initialState = {
    loading: true,
    data: [],
    message: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_PRODUCT_DATA:
            return {
                ...state,
                loading: true
            }
        case SHOW_PRODUCT_DATA:
            console.log('show PRODUCT data', action)
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case FAILED_GET_PRODUCT_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case SUCCESS_PRODUCT_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        default:
            return state
    }
}