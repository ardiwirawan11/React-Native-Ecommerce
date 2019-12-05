import { put, call } from 'redux-saga/effects'
import {SHOW_UPDATE, SUCCESS_UPDATE, FAILED_UPDATE } from '../type/UpdateType';
import { apiUpdate } from './api/apiUpdate';
export function* postUpdate(action) {
    try {
        const { data } = (action);
        const update = yield call(apiUpdate, data)
        console.log('action', action)
        console.log('update',update)
        yield put({ type: SHOW_UPDATE, payload: login })
        yield put({ type: SUCCESS_UPDATE, payload: 'Successfully Update ' })
    } catch (error) {
        yield put({ type: FAILED_UPDATE, payload: 'Fatal ERROR' })
        console.log(error)
    }
}

