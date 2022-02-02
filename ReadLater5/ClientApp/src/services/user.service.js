import Axios from 'axios';

export const userService = {
    login,
    logout,
    googleLogin,
    register
};

function login(email, password, rememberMe) {

    const credentials = {
        Email: email,
        Password: password,
        RememberMe: rememberMe
    };

    const requestOptions = {
        url: '/account/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: credentials
    };

    return Axios(requestOptions)
        .then(handleResponse)
        .then(data => {
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token-auth', JSON.stringify(data.token));

            return data;
        });
}

function register(email, password) {
    const credentials = {
        Email: email,
        Password: password
    };

    const requestOptions = {
        url: '/account/register',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: credentials
    };

    return Axios(requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function googleLogin(tokenId) {

    const credentials = {
        TokenId: tokenId
    };

    const requestOptions = {
        url: '/account/googlelogin',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: credentials
    };

    return Axios(requestOptions)
        .then(handleResponse)
        .then(data => {
            // user details and jwt token stored in local storage
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token-auth', JSON.stringify(data.token));

            return data;
        });
}

function logout() {
    localStorage.removeItem('token-auth');
    localStorage.removeItem('user');
}

function handleResponse(response) {
    if (response && response.status === 401) {
        window.location.reload(true);
    }

    return response.data;
}