import { userConstants } from '../../constants';

let user = JSON.parse(localStorage.getItem('user'));
let token = JSON.parse(localStorage.getItem('token-auth'));

const initialState = user && token
                    ? { loggedIn: true, user } 
                    : { loggedIn: false };

export function authentication(state = initialState, action) {
    switch(action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {
                loggedIn: false
            };
        case userConstants.GOOGLELOGIN_REQUEST:
            return {
                loggingIn: true
            };
        case userConstants.GOOGLELOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.GOOGLELOGIN_FAILURE:
            return {};
        default:
            return state
    }
}