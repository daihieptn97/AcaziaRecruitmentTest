const axios = require('axios').default;
export const Base_URL = 'https://randomuser.me/api/';
axios.defaults.baseURL = Base_URL;

export const getPersonApi = '0.4/?randomapi';

 function requestGet(link) {
    return  axios.get(link).then((response) => response.data).catch(e => console.log(e));
}
export default {
    get: requestGet,
};
