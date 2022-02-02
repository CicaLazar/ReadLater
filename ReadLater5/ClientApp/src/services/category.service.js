import Axios from 'axios';

export const categoryService = {
    getAll,
    deleteCategory,
    getById,
    addCategory,
    editCategory
};

function getAll() {
    const requestOptions = {
        url: 'categories/getall',
        method: 'GET'
    };
    return Axios(requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function deleteCategory(id) {
    const requestOptions = {
        url: 'categories/delete',
        method: 'POST',
        params: {
            id: id
        }
    };
    return Axios(requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function addCategory(category) {
    const requestOptions = {
        url: 'categories/add',
        method: 'POST',
        data: category
    };
    return Axios(requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function editCategory(category) {
    const requestOptions = {
        url: 'categories/edit',
        method: 'POST',
        data: category
    };
    return Axios(requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function getById(id) {
    const requestOptions = {
        url: '/categories/get',
        method: 'GET',
        params: {
            id: id
        }
    };
    return Axios(requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function handleResponse(response) {
    if (response && response.status === 401) {
        window.location.reload(true);
    }

    return response.data;
}