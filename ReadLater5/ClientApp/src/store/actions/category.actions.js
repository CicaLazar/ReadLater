import { categoryConstants } from '../../constants';
import { categoryService } from '../../services';
import toastr from 'toastr';

export const categoryActions = {
    getAll,
    deleteCategory,
    getById,
    addCategory,
    editCategory
};

function getAll() {
    return dispatch => {
        dispatch(request());

        categoryService.getAll()
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

    function request() { return { type: categoryConstants.GETALL_REQUEST } }
    function success(categories) { return { type: categoryConstants.GETALL_SUCCESS, categories } }
    function failure(error) { return { type: categoryConstants.GETALL_FAILURE, error } }
}

function deleteCategory(id) {
    return dispatch => {
        dispatch(request());

        categoryService.deleteCategory(id)
            .then(
                response => {
                    toastr.success(response.message);
                    dispatch(success());
                    dispatch(categoryActions.getAll());
                },
                error => {
                    dispatch(failure(error));
                    toastr.error(error.response.data.message);
                }
            );
    };

    function request() { return { type: categoryConstants.DELETE_REQUEST } }
    function success() { return { type: categoryConstants.DELETE_SUCCESS } }
    function failure(error) { return { type: categoryConstants.DELETE_FAILURE, error } }
}

function addCategory(category) {
    return dispatch => {
        dispatch(request());

        categoryService.addCategory(category)
            .then(
                response => {
                    toastr.success(response.message);
                    dispatch(success());
                    dispatch(categoryActions.getAll());
                },
                error => {
                    dispatch(failure(error));
                    toastr.error(error.response.data.message);
                }
            );
    };

    function request() { return { type: categoryConstants.ADD_REQUEST } }
    function success() { return { type: categoryConstants.ADD_SUCCESS } }
    function failure(error) { return { type: categoryConstants.ADD_FAILURE, error } }
}

function editCategory(category) {
    return dispatch => {
        dispatch(request());

        categoryService.editCategory(category)
            .then(
                response => {
                    toastr.success(response.message);
                    dispatch(success());
                    dispatch(categoryActions.getAll());
                },
                error => {
                    dispatch(failure(error));
                    toastr.error(error.response.data.message);
                }
            );
    };

    function request() { return { type: categoryConstants.EDIT_REQUEST } }
    function success() { return { type: categoryConstants.EDIT_SUCCESS } }
    function failure(error) { return { type: categoryConstants.EDIT_FAILURE, error } }
}

function getById(id) {
    return categoryService.getById(id)
        .then(
            response => {
                return response;
            },
            error => {
                toastr.error(error.response.data.message);
            }
        )
};