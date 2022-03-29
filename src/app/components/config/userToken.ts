export default {
    token: JSON.parse(localStorage.getItem('userToken')).token,
    id : JSON.parse(localStorage.getItem('userToken')).id
};
