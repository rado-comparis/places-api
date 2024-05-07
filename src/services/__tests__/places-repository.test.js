import * as httpClient from "../../data/http-client.js"
import { getPlace } from "../places-repository.js";
import placeService from "../places-service.js";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });  

describe("places-repository", async () => {
    describe("getPlace", async () => {
        test("With existing resource it should return place object", async () => {
            // arrange
            const place = {
                displayed_what: "what",
                displayed_where: "where",
                opening_hours: "hours"
            };
            const getMock = jest.spyOn(httpClient, "getPlace")
                .mockResolvedValue(place);
            const getOpeningHoursMock = jest.spyOn(placeService, "getOpeningHours")
                .mockResolvedValue([]);
            
            // act
            const result = getPlace("does-not-matter");

            // assert
            expect(result).toEqual({
                name: place.displayed_what,
                address: place.displayed_where,
                opening_hours: place.opening_hours
            });
            expect(getMock).toHaveBeenCalledTimes(1);
            expect(getOpeningHoursMock).toHaveBeenCalledTimes(1);
        });

        test("With non existent resource it should return null", async () => {
            // arrange
            const getMock = jest.spyOn(httpClient, "getPlace")
                .mockResolvedValue(null);
            const getOpeningHoursMock = jest.spyOn(placeService, "getOpeningHours")
                .mockResolvedValue([]);

            // act
            const result = getPlace("does-not-matter");

            // assert
            expect(result).toEqual(null);
            expect(getMock).toHaveBeenCalledTimes(1);
            expect(getOpeningHoursMock).toHaveBeenCalledTimes(0);
        });
    });
});