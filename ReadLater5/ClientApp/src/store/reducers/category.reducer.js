import { categoryConstants } from '../../constants';

export function category(state = { }, action) {
    switch (action.type) {
        case categoryConstants.GETALL_REQUEST:
            return {
                ...state
            };
        case categoryConstants.GETALL_SUCCESS:
            return {
                ...state,
                categories: [...action.categories]
            };
        case categoryConstants.GETALL_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case categoryConstants.DELETE_REQUEST:
            return {
                ...state
            };
        case categoryConstants.DELETE_SUCCESS:
            return {
                ...state
            };
        case categoryConstants.DELETE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case categoryConstants.ADD_REQUEST:
            return {
                ...state
            };
        case categoryConstants.ADD_SUCCESS:
            return {
                ...state
            };
        case categoryConstants.ADD_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case categoryConstants.EDIT_REQUEST:
            return {
                ...state
            };
        case categoryConstants.EDIT_SUCCESS:
            return {
                ...state
            };
        case categoryConstants.EDIT_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state
    }
}