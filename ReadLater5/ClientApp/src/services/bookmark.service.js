import Axios from 'axios';

export const bookmarkService = {
    getAll,
    deleteBookmark,
    getById,
    addBookmark,
    editBookmark
};

function getAll() {
    const requestOptions = {
        url: 'bookmarks/getall',
        method: 'GET'
    };
    return Axios(requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function deleteBookmark(id) {
    const requestOptions = {
        url: 'bookmarks/delete',
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

function addBookmark(bookmark) {
    const requestOptions = {
        url: 'bookmarks/add',
        method: 'POST',
        data: bookmark
    };
    return Axios(requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function editBookmark(bookmark) {
    const requestOptions = {
        url: 'bookmarks/edit',
        method: 'POST',
        data: bookmark
    };
    return Axios(requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

function getById(id) {
    const requestOptions = {
        url: '/bookmarks/get',
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