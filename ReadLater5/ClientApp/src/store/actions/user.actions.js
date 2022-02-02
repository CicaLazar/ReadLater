import { userConstants } from '../../constants';
import { userService } from '../../services';
import { history } from '../../helpers';
import { toast } from 'react-toastify';

export const userActions = {
    login,
    logout,
    googleLogin,
    register
};

function login(email, password, rememberMe) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password, rememberMe)
            .then(
                data => {
                    dispatch(success(data.user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    toast.error(error.response.data.message);
                }
            );
    };

    function request(email) { return { type: userConstants.LOGIN_REQUEST, email }}
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }}
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }}
}

function googleLogin(tokenId) {
    return dispatch => {
        dispatch(request());

        userService.googleLogin(tokenId)
            .then(
                data => {
                    dispatch(success(data.user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    toast.error(error.response.data.message);
                }
            );
    };

    function request() { return { type: userConstants.GOOGLELOGIN_REQUEST } }
    function success(user) { return { type: userConstants.GOOGLELOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GOOGLELOGIN_FAILURE, error } }
}

function register(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.register(email, password)
            .then(
                data => {
                    dispatch(success());
                    history.push('/login');
                    toast.success(data.message);
                },
                error => {
                    dispatch(failure(error));
                    toast.error(error.response.data.message);
                }
            );
    };

    function request(email) { return { type: userConstants.REGISTER_REQUEST, email } }
    function success() { return { type: userConstants.REGISTER_SUCCESS } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function logout() {
    userService.logout();

    return {
        type: userConstants.LOGOUT
    };
}