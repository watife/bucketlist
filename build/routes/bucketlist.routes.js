"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _bucketlist = _interopRequireDefault(require("../controllers/bucketlist.controller"));

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _item = _interopRequireDefault(require("../controllers/item.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
/**
 * create bucketlist route
 */

router.post("/", _authentication.default.verifyUserToken, _bucketlist.default.createBucketlist);
/**
 * get all bucketlist route
 */

router.get("/", _authentication.default.verifyUserToken, _bucketlist.default.fetchAllBucketlist);
/**
 * get a specified bucketlist route
 */

router.get("/:id", _authentication.default.verifyUserToken, _bucketlist.default.fetchBucketlist);
/**
 * update a specified bucketlist route
 */

router.put("/:id", _authentication.default.verifyUserToken, _bucketlist.default.updateBucketlist);
/**
 * delete a specified bucketlist route
 */

router.delete("/:id", _authentication.default.verifyUserToken, _bucketlist.default.deleteBucketlist);
/**
 * create item route
 */

router.post("/:id/items/", _authentication.default.verifyUserToken, _item.default.createItem);
/**
 * get all bucketlist item route
 */

router.get("/:id/items/", _authentication.default.verifyUserToken, _item.default.getAllItem);
/**
 * get a bucketlist item route
 */

router.get("/:id/items/:item_id", _authentication.default.verifyUserToken, _item.default.getItem);
/**
 * update a bucketlist item route
 */

router.put("/:id/items/:item_id", _authentication.default.verifyUserToken, _item.default.editItem);
/**
 * delete a bucketlist item route
 */

router.delete("/:id/items/:item_id", _authentication.default.verifyUserToken, _item.default.deleteItem);
var _default = router;
exports.default = _default;