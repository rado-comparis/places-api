import { Router } from "express";
import { getPlace, getPlaces } from "../services/places-repository.js";
import { badRequest, notFound } from "../responses/statuses.js";
export const router = new Router();

// /**
//  * Returns all places
//  */
router.get("/", async (req, res, next) => {
  try {
    res.json({ data: await getPlaces() });
}
catch (error) {
    return next(error);
}
});

/**
* Returns a place by id
*/
router.get("/:id", async (req, res, next) => {
  try {
      if (!req || !req.params || !req.params.id || req.params.id.length !== 22) {
          return badRequest(res, "Invalid id")
        }
        const post = await getPlace(req.params.id);
      
        if (!post) {
          return notFound(res);
        }
      
        return res.json({ data: post });
  }
  catch (error) {
      return next(error);
  }

});
