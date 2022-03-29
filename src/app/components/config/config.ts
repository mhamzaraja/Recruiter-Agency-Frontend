export default {
    host: "http://localhost:9000",
    token: JSON.parse(localStorage.getItem('userToken')).token,
    id: JSON.parse(localStorage.getItem('userToken')).id
};
