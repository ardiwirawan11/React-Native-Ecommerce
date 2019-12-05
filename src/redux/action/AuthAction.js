import { FETCH_TOKEN } from '../type/AuthType';
export const auth = data => {
    return {
        type: FETCH_TOKEN,
        payload: data
    };
};