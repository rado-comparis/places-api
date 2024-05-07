import request from "supertest";
import { app } from "../places.js";
import * as places from "../places.js";
import * as statuses from "../../responses/statuses.js"
import { httpCode } from "../../responses/http-codes.js";

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });  


  describe("places", () => {
    describe("GET /posts/:id", () => {
        test("With valid input it should return post and 200", done => {
            // arrange
            const getPlaceMock = jest.spyOn(places, "get")
                .mockResolvedValue({ test: "bla" });

            // act
            request(app)
            .get("/ohGSnJtMIC5nPfYRi_HTAg")
            .then(response => {
                // assert
                expect(getPlaceMock).toHaveBeenCalledTimes(1);
                expect(response.statusCode).toBe(httpCode.OK);
                done();
            });

        });

        test("With invalid input it should return 400 bad request", done => {
            // arrange
            const getPlaceMock = jest.spyOn(places, "get")
                .mockResolvedValue(null);
            const statusesMock = jest.spyOn(statuses, "badRequest")
                .mockReturnValue(statuses.badRequest);
            // act
            request(app)
            .get("/invalid")
            .then(response => {
                // assert
                expect(statusesMock).toBe(statuses.badRequest);
                expect(getPlaceMock).toHaveBeenCalledTimes(0);
                done();
            });
          });

          test("With non existent id it should return 404 not found", done => {
            // arrange
            const getPlaceMock = jest.spyOn(places, "get")
                .mockResolvedValue(null);
            const statusesMock = jest.spyOn(statuses, "notFound")
                .mockReturnValue(statuses.badRequest);
            // act
            request(app)
            .get("/ohGSnJtMIC5nPfYRi_HTAg")
            .then(response => {
                // assert
                expect(statusesMock).toBe(statuses.notFound());
                expect(getPlaceMock).toHaveBeenCalledTimes(1);
                done();
            });
          });

          test("With server error it should execute next middleware (exception handler not tested here)", done => {
            // arrange
            const getPlaceMock = jest.spyOn(places, "get")
                .mockResolvedValue(new Error("TEST") );
            const nextMock = jest.spyOn

            // act
            request(app)
            .get("/ohGSnJtMIC5nPfYRi_HTAg")
            .then(response => {
                // assert
                expect(getPlaceMock).toHaveBeenCalledTimes(1);
                done();
            });
          });
      });
});
