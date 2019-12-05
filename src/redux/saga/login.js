import { put, call } from 'redux-saga/effects'
import {SHOW_LOGIN, SUCCESS_LOGIN, FAILED_LOGIN } from '../type/LoginType';
import { apiLogin } from './api/apiLogin';
export function* postLogin(action) {
    try {
        const { data } = (action);
        const login = yield call(apiLogin, data)
        console.log('action', action)
        console.log('login',login)
        yield put({ type: SHOW_LOGIN, payload: login })
        yield put({ type: SUCCESS_LOGIN, payload: 'Successfully Login ' })
    } catch (error) {
        yield put({ type: FAILED_LOGIN, payload: 'Fatal ERROR' })
        console.log(error)
    }
}

