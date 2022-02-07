const axios = require('axios');

async function postLogin(data) {
    try {
        const resp = await axios.post(`http://localhost/login`, data);
        const tokenData = resp.json();
        if (tokenData.err) { throw Error(tokenData.err) }
        return tokenData;
    } catch (err) {
        console.warn(`Error requesting log in: ${err}`);
    }
}

async function postRegister(data) {
    try {
        const resp = await axios.post("http://localhost/register", data);
        const newUser = resp.json();
        return newUser;
    } catch (err) {
        console.warn(`Error requesting user registration: ${err}`);
    }
}

export { postLogin, postRegister }