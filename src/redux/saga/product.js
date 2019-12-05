import { put, call } from 'redux-saga/effects'
import {SHOW_PRODUCT_DATA, FAILED_GET_PRODUCT_DATA, SUCCESS_PRODUCT_DATA} from '../type/ProductType';
import { apiGetProduct } from './api/apiProduct';
export function* getProductData(action) {
    try {
        const { token } = action;
        const Product = yield call(apiGetProduct, token)
        console.log('action', action)
        console.log('Product',Product)
        yield put({ type: SHOW_PRODUCT_DATA, payload: Product })
        yield put({ type: SUCCESS_PRODUCT_DATA, payload: 'Successfully get ' })
    } catch (error) {
        yield put({ type: FAILED_GET_PRODUCT_DATA, payload: 'Fatal ERROR' })
        console.log(error)
    }
}

