"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _item = _interopRequireDefault(require("../controllers/item.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
/**
 * create item route
 */

router.post("/", _authentication.default.verifyUserToken, _item.default.createItem);
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

var _default = router;
exports.default = _default;