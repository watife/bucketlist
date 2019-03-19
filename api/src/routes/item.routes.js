import { Router } from "express";
import AuthController from "../middlewares/authentication";
import ItemController from "../controllers/item.controller";

const router = Router();

/**
 * create item route
 */
router.post("/", AuthController.verifyUserToken, ItemController.createItem);

/**
 * get all bucketlist route
 */
// router.get(
//   "/",
//   AuthController.verifyUserToken,
//   BucketlistController.fetchAllBucketlist
// );

/**
 * get a specified bucketlist route
 */
// router.get(
//   "/:id",
//   AuthController.verifyUserToken,
//   BucketlistController.fetchBucketlist
// );

/**
 * update a specified bucketlist route
 */
// router.put(
//   "/:id",
//   AuthController.verifyUserToken,
//   BucketlistController.updateBucketlist
// );

/**
 * delete a specified bucketlist route
 */
// router.delete(
//   "/:id",
//   AuthController.verifyUserToken,
//   BucketlistController.deleteBucketlist
// );

export default router;
