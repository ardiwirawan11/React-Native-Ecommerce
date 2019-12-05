import axios from 'axios';
export const apiUpdate = (id, token, data) => {
    return axios({
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`bearer ${token}`
        },
        url: `https://glints-tim8-e-commerce.herokuapp.com/api/users/login/${id}`,
        data: JSON.stringify(data)
    })
        .then( (res) => {
            console.log('data dari api nya ', res.data);
            return res.data
        });
};