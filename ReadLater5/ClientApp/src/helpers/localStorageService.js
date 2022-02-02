export function setToken(data) {
    localStorage.setItem('token-auth', data.token);
    localStorage.setItem('user', data.user);
}

export function getAccessToken() {
    return JSON.parse(localStorage.getItem('token-auth'));
}

export function getRefreshToken() {
    return JSON.parse(localStorage.getItem('token-auth'));
}

export function clearToken() {
    localStorage.removeItem('user');
    localStorage.removeItem('token-auth');
}