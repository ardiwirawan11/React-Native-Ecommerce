import axios from 'axios';
export const apiGetDetail  = (token,id) => {
    console.log('token detail nya ', token);
    let headers = {
        'Authorization': 'bearer '+token
    };
    return axios
        .get(
            `https://glints-tim8-e-commerce.herokuapp.com/api/products/detail/${id}`,
            { headers: headers }  
        )
        .then(function (res) {
            console.log('data dari api detail ', res.data.data);
            return res.data.data
        });
};