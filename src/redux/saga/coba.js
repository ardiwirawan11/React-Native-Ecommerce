import { put, call } from 'redux-saga/effects'
import {SHOW_COBA_DATA, FAILED_GET_COBA_DATA, SUCCESS_COBA_DATA} from '../type/CobaType';
import { apiGetCoba } from './api/apiCoba';
export function* getCobaData(action) {
    try {
        const { token } = action;
        const Coba = yield call(apiGetCoba, token)
        console.log('action', action)
        console.log('Product',Coba)
        yield put({ type: SHOW_COBA_DATA, payload: Coba })
        yield put({ type: SUCCESS_COBA_DATA, payload: 'Successfully get ' })
    } catch (error) {
        yield put({ type: FAILED_GET_COBA_DATA, payload: 'Fatal ERROR' })
        console.log(error)
    }
}

