import { put, call } from 'redux-saga/effects'
import {SHOW_DETAIL_DATA, FAILED_GET_DETAIL_DATA, SUCCESS_DETAIL_DATA} from '../type/DetailType';
import { apiGetDetail } from './api/apiDetail';
export function* getDetailData(action) {
    try {
        const { token, id} = action;
        const Detail = yield call(apiGetDetail, token, id)
        console.log('action', action)
        console.log('token', token)
        console.log('id', id)
        console.log('Detail',Detail)
        yield put({ type: SHOW_DETAIL_DATA, payload: Detail })
        yield put({ type: SUCCESS_DETAIL_DATA, payload: 'Successfully get ' })
    } catch (error) {
        yield put({ type: FAILED_GET_DETAIL_DATA, payload: 'Fatal ERROR' })
        console.log(error)
    }
}

