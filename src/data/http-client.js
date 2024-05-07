import fetch from 'node-fetch';
import { httpCode } from '../responses/http-codes';

export const get = async function (url) {
    const response = await fetch(url, {
        method: "GET",
        body: null,
        headers: { "Content-Type": "application/json"}
    });

    if (response.status === httpCode.OK) {
        return await response.json()
    }

    if (response.status === httpCode.BadRequest) {
        return null;
    }

    return next(response.error)
}