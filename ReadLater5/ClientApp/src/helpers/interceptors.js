import axios from 'axios';
import { userActions } from '../store/actions';
import { getAccessToken } from '../helpers/localStorageService';

export default {
    setupInterceptors: (store, history) => {

        axios.interceptors.request.use(
            config => {
                const token = getAccessToken();
                if (token) {
                    config.headers['Authorization'] = 'Bearer ' + token;
                }

                config.headers['Content-Type'] = 'application/json';

                return config;
            },
            error => {
                Promise.reject(error)
            });

        axios.interceptors.response.use(response => {
            return response;
        }, error => {
            if (error.response.status === 401) {
                store.dispatch(userActions.logout());
                history.push('/login');
            }

            return Promise.reject(error);
        });
    },
};