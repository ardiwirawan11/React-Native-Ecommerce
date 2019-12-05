import { REQUEST_LOGIN, SHOW_LOGIN, FAILED_LOGIN, SUCCESS_LOGIN } from '../type/LoginType'
const initialState = {
    loading: true,
    data: [],
    message: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_LOGIN:
            return {
                ...state,
                loading: true
            }
        case SHOW_LOGIN:
            console.log('show user data', action.payload)
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case FAILED_LOGIN:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case SUCCESS_LOGIN:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        default:
            return state
    }
}