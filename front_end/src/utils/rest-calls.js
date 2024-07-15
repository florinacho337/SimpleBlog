import { BLOGPOSTS_BASE_URL } from "./urls";

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function json(response) {
    return response.json()
}

export function getBlogPosts() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    let antet = { method : 'GET',
        headers : headers,
        mode : 'cors',
    };

    return fetch(BLOGPOSTS_BASE_URL, antet)
        .then(status)
        .then(json)
        .then(data => {
            return data;
        })
        .catch(error => {
            return Promise.reject(error);
        });
}

export function createBlogPost(blogPost) {
    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type","application/json");

    let antet = { method : 'POST',
        headers : headers,
        mode : 'cors',
        body: JSON.stringify(blogPost)
    };

    return fetch(BLOGPOSTS_BASE_URL, antet)
        .then(status)
        .then(json)
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        });
}

export function deleteBlogPost(blogPostId) {
    let headers = new Headers();
    headers.append("Accept", "application/json");

    let antet = { method : 'DELETE',
        headers : headers,
        mode : 'cors',
    };

    const deleteUrl = BLOGPOSTS_BASE_URL + blogPostId + '/';
    return fetch(deleteUrl, antet)
        .then(status)
        .then(response => {
            return response.text();
        })
        .catch(error => {
            return Promise.reject(error);
        });
}

export function updateBlogPost(blogPost) {
    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type","application/json");

    let antet = { method : 'PUT',
        headers : headers,
        mode : 'cors',
        body: JSON.stringify(blogPost)
    };

    const updateUrl = BLOGPOSTS_BASE_URL + blogPost.id + '/';
    return fetch(updateUrl, antet)
        .then(status)
        .then(json)
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        });
}