import { bookmarkConstants } from '../../constants';

export function bookmark(state = { }, action) {
    switch (action.type) {
        case bookmarkConstants.GETALL_REQUEST:
            return {
                ...state
            };
        case bookmarkConstants.GETALL_SUCCESS:
            return {
                ...state,
                bookmarks: [...action.bookmarks]
            };
        case bookmarkConstants.GETALL_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case bookmarkConstants.DELETE_REQUEST:
            return {
                ...state
            };
        case bookmarkConstants.DELETE_SUCCESS:
            return {
                ...state
            };
        case bookmarkConstants.DELETE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case bookmarkConstants.ADD_REQUEST:
            return {
                ...state
            };
        case bookmarkConstants.ADD_SUCCESS:
            return {
                ...state
            };
        case bookmarkConstants.ADD_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case bookmarkConstants.EDIT_REQUEST:
            return {
                ...state
            };
        case bookmarkConstants.EDIT_SUCCESS:
            return {
                ...state
            };
        case bookmarkConstants.EDIT_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state
    }
}