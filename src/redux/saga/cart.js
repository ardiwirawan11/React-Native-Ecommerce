import { put, call } from 'redux-saga/effects'
import {SHOW_CART_DATA, FAILED_GET_CART_DATA, SUCCESS_CART_DATA} from '../type/CartType';
import { apiGetCart } from './api/apiCart';
export function* getCartData(action) {
    try {
        const { token } = action;
        const Cart = yield call(apiGetCart, token)
        console.log('action', action)
        console.log('Product',Cart)
        yield put({ type: SHOW_CART_DATA, payload: Cart })
        yield put({ type: SUCCESS_CART_DATA, payload: 'Successfully get ' })
    } catch (error) {
        yield put({ type: FAILED_GET_CART_DATA, payload: 'Fatal ERROR' })
        console.log(error)
    }
}

