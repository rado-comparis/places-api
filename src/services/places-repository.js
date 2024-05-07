import { get } from "../data/http-client.js"
import { getOpeningHours, createPlace } from "./places-service.js";

    export const getPlaces = async function () {
        // faking to get all
        // TODO put URL to config
        const place1 = await get("https://storage.googleapis.com/coding-session-rest-api/ohGSnJtMIC5nPfYRi_HTAg", "GET", null)
        const place2 = await get("https://storage.googleapis.com/coding-session-rest-api/GXvPAor1ifNfpF0U5PTG0w", "GET", null)
        

        return [createPlace(place1), createPlace(place2)];
    }

export const getPlace = async function (id) {
    const place = await get(`https://storage.googleapis.com/coding-session-rest-api/${id}`, "GET", null);

    if (place) {
        return {
            id: place.local_entry_id,
                name: place.displayed_what,
                address: place.displayed_where,
                opening_hours: getOpeningHours(place.opening_hours.days)
        }
    }
    return null;
}
 