import { all, takeLatest } from 'redux-saga/effects';
import { REQUEST_USER_DATA } from '../type/userType';
import { getUserData } from './user';
import { REQUEST_LOGIN } from '../type/LoginType';
import { postLogin } from './login';
import { REQUEST_UPDATE } from '../type/UpdateType';
import { postUpdate } from './update';
import { REQUEST_PRODUCT_DATA } from '../type/ProductType';
import { getProductData } from './product';
import { REQUEST_MYPRODUCT_DATA } from '../type/MyproductType';
import { getMyproductData } from './myproduct';
import { REQUEST_CART_DATA } from '../type/CartType';
import { getCartData } from './cart';
import { REQUEST_COBA_DATA } from '../type/CobaType';
import { getCobaData } from './coba';
import { REQUEST_DETAIL_DATA } from '../type/DetailType';
import { getDetailData } from './detail';
export default function* IndexSaga() {
    yield all([takeLatest(REQUEST_USER_DATA, getUserData)]);
    yield all([takeLatest(REQUEST_LOGIN, postLogin)]);
    yield all([takeLatest(REQUEST_UPDATE, postUpdate)]);
    yield all([takeLatest(REQUEST_PRODUCT_DATA, getProductData)]);
    yield all([takeLatest(REQUEST_MYPRODUCT_DATA, getMyproductData)]);
    yield all([takeLatest(REQUEST_CART_DATA, getCartData)]);
    yield all([takeLatest(REQUEST_COBA_DATA, getCobaData)]);
    yield all([takeLatest(REQUEST_DETAIL_DATA, getDetailData)]);
}