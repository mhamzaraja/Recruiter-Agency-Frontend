export default {
    token: JSON.parse(localStorage.getItem('userToken'))?.token,
    role: JSON.parse(localStorage.getItem('userToken'))?.roles[0],
    id : JSON.parse(localStorage.getItem('userToken'))?.id
};
