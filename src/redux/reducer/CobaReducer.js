import {REQUEST_COBA_DATA, SHOW_COBA_DATA, FAILED_GET_COBA_DATA, SUCCESS_COBA_DATA} from '../type/CobaType'
const initialState = {
    loading: true,
    data: [],
    message: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_COBA_DATA:
            return {
                ...state,
                loading: true
            }
        case SHOW_COBA_DATA:
            console.log('show cart data', action)
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case FAILED_GET_COBA_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case SUCCESS_COBA_DATA:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        default:
            return state
    }
}