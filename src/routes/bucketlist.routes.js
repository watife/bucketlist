import { Router } from "express";
import BucketlistController from "../controllers/bucketlist.controller";
import AuthController from "../middlewares/authentication";
import ItemController from "../controllers/item.controller";

const router = Router();

/**
 * create bucketlist route
 */
router.post(
  "/",
  AuthController.verifyUserToken,
  BucketlistController.createBucketlist
);

/**
 * get all bucketlist route
 */
router.get(
  "/",
  AuthController.verifyUserToken,
  BucketlistController.fetchAllBucketlist
);

/**
 * get a specified bucketlist route
 */
router.get(
  "/:id",
  AuthController.verifyUserToken,
  BucketlistController.fetchBucketlist
);

/**
 * update a specified bucketlist route
 */
router.put(
  "/:id",
  AuthController.verifyUserToken,
  BucketlistController.updateBucketlist
);

/**
 * delete a specified bucketlist route
 */
router.delete(
  "/:id",
  AuthController.verifyUserToken,
  BucketlistController.deleteBucketlist
);

/**
 * create item route
 */
router.post(
  "/:id/items/",
  AuthController.verifyUserToken,
  ItemController.createItem
);

/**
 * get all bucketlist item route
 */
router.get(
  "/:id/items/",
  AuthController.verifyUserToken,
  ItemController.getAllItem
);

/**
 * get a bucketlist item route
 */
router.get(
  "/:id/items/:item_id",
  AuthController.verifyUserToken,
  ItemController.getItem
);

/**
 * update a bucketlist item route
 */
router.put(
  "/:id/items/:item_id",
  AuthController.verifyUserToken,
  ItemController.editItem
);

/**
 * delete a bucketlist item route
 */
router.delete(
  "/:id/items/:item_id",
  AuthController.verifyUserToken,
  ItemController.deleteItem
);

export default router;
