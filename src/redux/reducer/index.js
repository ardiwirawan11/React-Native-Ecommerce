import { combineReducers } from 'redux'
import user from './userReducer'
import auth from './AuthReducer'
import login from './LoginReducer'
import update from './UpdateReducer'
import product from './ProductReducer'
import myproduct from './MyproductReducer'
import cart from './CartReducer'
import coba from './CobaReducer'
import detail from './DetailReducer'

const IndexReducer = combineReducers ({
user : user,
auth : auth,
login : login,
update: update,
product: product,
myproduct: myproduct,
cart: cart,
coba: coba,
detail: detail

})
export default IndexReducer