import { put, call } from 'redux-saga/effects'
import {SHOW_MYPRODUCT_DATA, FAILED_GET_MYPRODUCT_DATA, SUCCESS_MYPRODUCT_DATA} from '../type/MyproductType';
import { apiGetMyproduct } from './api/apiMyproduct';
export function* getMyproductData(action) {
    try {
        const { token } = action;
        const Myproduct = yield call(apiGetMyproduct, token)
        console.log('action', action)
        console.log('Product',Myproduct)
        yield put({ type: SHOW_MYPRODUCT_DATA, payload: Myproduct })
        yield put({ type: SUCCESS_MYPRODUCT_DATA, payload: 'Successfully get ' })
    } catch (error) {
        yield put({ type: FAILED_GET_MYPRODUCT_DATA, payload: 'Fatal ERROR' })
        console.log(error)
    }
}

