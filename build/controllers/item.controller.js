"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _item = _interopRequireDefault(require("../models/item.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import Bucketlist from "../models/bucketlist.model";
var ItemController =
/*#__PURE__*/
function () {
  function ItemController() {
    _classCallCheck(this, ItemController);
  }

  _createClass(ItemController, null, [{
    key: "createItem",

    /*
     *
     * controller to create an item to the bucketlist
     * required: name, bucketlist_id
     *
     */
    value: function () {
      var _createItem = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var name, id, itemCheck, newItem;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                name = req.body.name;
                id = req.params.id; // verify that the bucketlist doesnt have the item already

                _context.next = 5;
                return _item.default.findOne({
                  where: {
                    name: name,
                    bucketlist_id: id
                  }
                });

              case 5:
                itemCheck = _context.sent;

                if (!itemCheck) {
                  _context.next = 8;
                  break;
                }

                throw new Error("this item already exists in this bucketlist");

              case 8:
                _context.next = 10;
                return _item.default.create({
                  name: name,
                  bucketlist_id: id
                });

              case 10:
                newItem = _context.sent;

                if (newItem) {
                  _context.next = 13;
                  break;
                }

                throw new Error("oops!, could not create the item, try again");

              case 13:
                return _context.abrupt("return", res.status(201).json({
                  status: "success",
                  message: "Item created successfully in the bucketlist",
                  data: newItem
                }));

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context.t0.message
                }));

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 16]]);
      }));

      function createItem(_x, _x2) {
        return _createItem.apply(this, arguments);
      }

      return createItem;
    }()
    /*
     *
     * controller to get all item in a bucketlist
     * required: bucketlist_id, item_id
     *
     */

  }, {
    key: "getAllItem",
    value: function () {
      var _getAllItem = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var id, item;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                id = req.params.id; // verify that the bucketlist doesnt have the item already

                _context2.next = 4;
                return _item.default.findAll({
                  where: {
                    bucketlist_id: id
                  }
                });

              case 4:
                item = _context2.sent;

                if (item) {
                  _context2.next = 7;
                  break;
                }

                throw new Error("no item in this bucketlist");

              case 7:
                return _context2.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "item retrieved successfully",
                  data: item
                }));

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context2.t0.message
                }));

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 10]]);
      }));

      function getAllItem(_x3, _x4) {
        return _getAllItem.apply(this, arguments);
      }

      return getAllItem;
    }()
    /*
     *
     * controller to get an item in a bucketlist
     * required: item_id, bucketlist_id
     *
     */

  }, {
    key: "getItem",
    value: function () {
      var _getItem = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var _req$params, id, item_id, item;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                // eslint-disable-next-line camelcase
                _req$params = req.params, id = _req$params.id, item_id = _req$params.item_id; // verify that the bucketlist doesnt have the item already

                _context3.next = 4;
                return _item.default.findOne({
                  where: {
                    bucketlist_id: id,
                    id: item_id
                  }
                });

              case 4:
                item = _context3.sent;

                if (item) {
                  _context3.next = 7;
                  break;
                }

                throw new Error("this item is not in this bucketlist");

              case 7:
                return _context3.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "item retrieved successfully",
                  data: item
                }));

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context3.t0.message
                }));

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 10]]);
      }));

      function getItem(_x5, _x6) {
        return _getItem.apply(this, arguments);
      }

      return getItem;
    }()
    /*
     *
     * controller to edit an item in a bucketlist
     * required: item_id, bucketlist_id
     *
     */

  }, {
    key: "editItem",
    value: function () {
      var _editItem = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var _req$params2, id, item_id, _req$body, name, done, item, itemUpdateData, itemUpdated;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                // eslint-disable-next-line camelcase
                _req$params2 = req.params, id = _req$params2.id, item_id = _req$params2.item_id;
                _req$body = req.body, name = _req$body.name, done = _req$body.done; // verify that the bucketlist doesnt have the item already

                _context4.next = 5;
                return _item.default.findOne({
                  where: {
                    bucketlist_id: id,
                    id: item_id
                  }
                });

              case 5:
                item = _context4.sent;

                if (item) {
                  _context4.next = 8;
                  break;
                }

                throw new Error("this item is not in this bucketlist");

              case 8:
                itemUpdateData = {
                  name: name || item.name,
                  done: done || item.done
                };
                _context4.next = 11;
                return _item.default.update({
                  name: itemUpdateData.name,
                  done: itemUpdateData.done
                }, {
                  where: {
                    id: item_id,
                    bucketlist_id: id
                  }
                });

              case 11:
                itemUpdated = _context4.sent;

                if (itemUpdated) {
                  _context4.next = 14;
                  break;
                }

                throw new Error("could not modify this item");

              case 14:
                return _context4.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "item updated successfully"
                }));

              case 17:
                _context4.prev = 17;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context4.t0.message
                }));

              case 20:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 17]]);
      }));

      function editItem(_x7, _x8) {
        return _editItem.apply(this, arguments);
      }

      return editItem;
    }()
    /*
     *
     * controller to delete an item in a bucketlist
     * required: item_id, bucketlist_id
     *
     */

  }, {
    key: "deleteItem",
    value: function () {
      var _deleteItem = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var _req$params3, id, item_id, item;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                // eslint-disable-next-line camelcase
                _req$params3 = req.params, id = _req$params3.id, item_id = _req$params3.item_id;
                _context5.next = 4;
                return _item.default.destroy({
                  where: {
                    id: item_id,
                    bucketlist_id: id
                  }
                });

              case 4:
                item = _context5.sent;

                if (item) {
                  _context5.next = 7;
                  break;
                }

                throw new Error("could not delete the bucketlist");

              case 7:
                return _context5.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "item deleted successfully"
                }));

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context5.t0.message
                }));

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 10]]);
      }));

      function deleteItem(_x9, _x10) {
        return _deleteItem.apply(this, arguments);
      }

      return deleteItem;
    }()
  }]);

  return ItemController;
}();

var _default = ItemController;
exports.default = _default;