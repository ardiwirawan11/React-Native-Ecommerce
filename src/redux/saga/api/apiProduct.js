import axios from 'axios';
export const apiGetProduct = () => {
    return axios
        .get(
            'https://glints-tim8-e-commerce.herokuapp.com/api/products'  
        )
        .then(function (res) {
            console.log('data dari api nya ', res.data.data);
            return res.data.data
        });
};