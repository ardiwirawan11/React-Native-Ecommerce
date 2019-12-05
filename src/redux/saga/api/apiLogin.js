import axios from 'axios';
export const apiLogin = (data) => {
    console.log('apiLogin ', JSON.stringify(data));
    return axios({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization':'TOKEN'
        },
        url: 'https://glints-tim8-e-commerce.herokuapp.com/api/users/login/',
        data: JSON.stringify(data)
    })
        .then( (res) => {
            console.log('data dari api nya ', res.data);
            return res.data
        });
};