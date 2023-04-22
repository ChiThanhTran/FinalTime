import axios from 'axios';

const login = async (username, password) => {
    const response = await axios.post("https://rookiesgroup4.azurewebsites.net/authenticate", {
        username,
        password,
    });
    if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data));
    }
    return response.data;
};
const authService = {
    login
};

export default authService;