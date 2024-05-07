import * as httpClient from "../../data/http-client.js"
import { getPlace } from "../places-repository.js";

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
            
            // act
            const result = getPlace("does-not-matter");

            // assert
            expect(getMock).toEqual({
                name: place.displayed_what,
                address: place.displayed_where,
                opening_hours: place.opening_hours
            });
        });

        test("With non existent resource it should return null", async () => {
            // arrange
            const getMock = jest.spyOn(httpClient, "getPlace")
                .mockResolvedValue(null);
            

            // act
            const result = getPlace("does-not-matter");

            // assert
            expect(getMock).toEqual(null);
        });
    });
});