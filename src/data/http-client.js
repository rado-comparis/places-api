import fetch from 'node-fetch';

export const get = async function (url) {
    const response = await fetch(url, {
        method: "GET",
        body: null,
        headers: { "Content-Type": "application/json"}
    });

    if (response.status === 200) {
        return await response.json()
    }

    if (response.status === 404) {
        return null;
    }

    return next(response.error)
}