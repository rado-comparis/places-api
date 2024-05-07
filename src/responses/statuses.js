import { httpCode } from "./http-codes.js";

export const badRequest = function(res, message) {
    res.status(httpCode.BadRequest).json({ errors: [{ 
      code: httpCode.BadRequest,
      message
    }]})
  };
  
 export const notFound = function(res) {
    res.status(httpCode.NotFound).json({ errors: [{ 
      code: httpCode.NotFound,
      message: "Resource not found"
    }]});
  };

  export const internalServerError = function(res) {
    res.status(httpCode.InternalServerError).json({ errors: [{ 
      code: httpCode.InternalServerError,
      message: "Internal Server Error"
    }]});
  };