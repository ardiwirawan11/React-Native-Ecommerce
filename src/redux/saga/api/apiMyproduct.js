import axios from 'axios';
export const apiGetMyproduct  = (token) => {
    console.log('token myproduct nya ', token);
    let headers = {
        'Authorization': 'bearer '+token
    };
    return axios
        .get(
            'https://glints-tim8-e-commerce.herokuapp.com/api/products/myProducts',
            { headers: headers }  
        )
        .then(function (res) {
            console.log('data dari api myproduct ', res.data.data);
            return res.data.data
        });
};