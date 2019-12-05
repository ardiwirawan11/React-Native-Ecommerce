import axios from 'axios';
export const apiGetUser = (token) => {
    console.log('token nya ', token);
    let headers = {
        'Authorization': 'bearer '+token
    };
    return axios
        .get(
            'https://glints-tim8-e-commerce.herokuapp.com/api/users/me',
            { headers: headers }
        )
        .then(function (res) {
            console.log('data dari api nya ', res.data.data);
            return res.data.data
        });
};