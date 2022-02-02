import { bookmarkConstants } from '../../constants';
import { bookmarkService } from '../../services';
import toastr from 'toastr';

export const bookmarkActions = {
    getAll,
    deleteBookmark,
    getById,
    addBookmark,
    editBookmark
};

function getAll() {
    return dispatch => {
        dispatch(request());

        bookmarkService.getAll()
            .then(
                response => {
                    dispatch(success(response));
                },
                error => {
                    dispatch(failure(error));
                    toastr.error(error.response.data.message);
                }
            );
    };

    function request() { return { type: bookmarkConstants.GETALL_REQUEST } }
    function success(bookmarks) { return { type: bookmarkConstants.GETALL_SUCCESS, bookmarks } }
    function failure(error) { return { type: bookmarkConstants.GETALL_FAILURE, error } }
}

function deleteBookmark(id) {
    return dispatch => {
        dispatch(request());

        bookmarkService.deleteBookmark(id)
            .then(
                response => {
                    toastr.success(response.message);
                    dispatch(success());
                    dispatch(bookmarkActions.getAll());
                },
                error => {
                    dispatch(failure(error));
                    toastr.error(error.response.data.message);
                }
            );
    };

    function request() { return { type: bookmarkConstants.DELETE_REQUEST } }
    function success() { return { type: bookmarkConstants.DELETE_SUCCESS } }
    function failure(error) { return { type: bookmarkConstants.DELETE_FAILURE, error } }
}

function addBookmark(bookmark) {
    return dispatch => {
        dispatch(request());

        bookmarkService.addBookmark(bookmark)
            .then(
                response => {
                    toastr.success(response.message);
                    dispatch(success());
                    dispatch(bookmarkActions.getAll());
                },
                error => {
                    dispatch(failure(error));
                    toastr.error(error.response.data.message);
                }
            );
    };

    function request() { return { type: bookmarkConstants.ADD_REQUEST } }
    function success() { return { type: bookmarkConstants.ADD_SUCCESS } }
    function failure(error) { return { type: bookmarkConstants.ADD_FAILURE, error } }
}

function editBookmark(bookmark) {
    return dispatch => {
        dispatch(request());

        bookmarkService.editBookmark(bookmark)
            .then(
                response => {
                    toastr.success(response.message);
                    dispatch(success());
                    dispatch(bookmarkActions.getAll());
                },
                error => {
                    dispatch(failure(error));
                    toastr.error(error.response.data.message);
                }
            );
    };

    function request() { return { type: bookmarkConstants.EDIT_REQUEST } }
    function success() { return { type: bookmarkConstants.EDIT_SUCCESS } }
    function failure(error) { return { type: bookmarkConstants.EDIT_FAILURE, error } }
}

function getById(id) {
    return bookmarkService.getById(id)
        .then(
            response => {
                return response;
            },
            error => {
                toastr.error(error.response.data.message);
            }
        )
};