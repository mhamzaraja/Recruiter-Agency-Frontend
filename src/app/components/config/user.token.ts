export default {
    token: JSON.parse(localStorage.getItem('userToken')).token,
    userId : JSON.parse(localStorage.getItem('userToken')).id
};
