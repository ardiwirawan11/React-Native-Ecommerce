import { REQUEST_UPDATE, SHOW_UPDATE, FAILED_UPDATE, SUCCESS_UPDATE } from '../type/UpdateType'
const initialState = {
    loading: true,
    data: [],
    message: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_UPDATE:
            return {
                ...state,
                loading: true
            }
        case SHOW_UPDATE:
            console.log('show user data', action.payload)
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case FAILED_UPDATE:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case SUCCESS_UPDATE:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        default:
            return state
    }
}