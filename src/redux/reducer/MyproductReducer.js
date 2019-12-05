import {REQUEST_MYPRODUCT_DATA, SHOW_MYPRODUCT_DATA, FAILED_GET_MYPRODUCT_DATA, SUCCESS_MYPRODUCT_DATA} from '../type/MyproductType'
const initialState = {
    loading: true,
    data: [],
    message: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_MYPRODUCT_DATA:
            return {
                ...state,
                loading: true
            }
        case SHOW_MYPRODUCT_DATA:
            console.log('show MYPRODUCT data', action)
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case FAILED_GET_MYPRODUCT_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case SUCCESS_MYPRODUCT_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        default:
            return state
    }
}