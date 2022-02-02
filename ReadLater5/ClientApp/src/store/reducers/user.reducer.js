import { userConstants } from '../../constants';

export function user(state = { }, action) {
    switch(action.type) {
        case userConstants.REGISTER_REQUEST:
            return {
                registering: true
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                registering: false
            };
        case userConstants.REGISTER_FAILURE:
            return {
                registering: false
            };
        default:
            return state
    }
}