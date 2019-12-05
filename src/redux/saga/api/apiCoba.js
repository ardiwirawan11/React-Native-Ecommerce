import axios from 'axios';
export const apiGetCoba  = (token) => {
    let headers = {
        'Authorization': 'bearer '+token
    };
    return axios
        .get(
            'https://glints-tim8-e-commerce.herokuapp.com/api/cart',
            { headers: headers }  
        )
        .then(function (res) {
            console.log('data dari api cart ', res.data.data._orders);
            return res.data.data._orders
        });
};