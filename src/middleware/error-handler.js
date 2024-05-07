import { internalServerError } from "../responses/statuses.js";

export const errorHandler = function (err, req, res, next) {
    if (! err) {
        return next();
    }
  
    console.log(`Error: ${err.stack}`);
  
    internalServerError(res);
  }