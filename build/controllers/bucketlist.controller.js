"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _bucketlist2 = _interopRequireDefault(require("../models/bucketlist.model"));

var _item = _interopRequireDefault(require("../models/item.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Op = _sequelize.default.Op;

var BucketlistController =
/*#__PURE__*/
function () {
  function BucketlistController() {
    _classCallCheck(this, BucketlistController);
  }

  _createClass(BucketlistController, null, [{
    key: "createBucketlist",

    /*
     *
     * controller to create a bucketlist
     * required: name, created_by
     *
     */
    value: function () {
      var _createBucketlist = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var name, listCheck, newBucketlist;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                name = req.body.name; // verify that the bucketlist doesnt exist

                _context.next = 4;
                return _bucketlist2.default.findOne({
                  where: {
                    name: name
                  }
                });

              case 4:
                listCheck = _context.sent;

                if (!listCheck) {
                  _context.next = 7;
                  break;
                }

                throw new Error("this bucketlist already exist");

              case 7:
                _context.next = 9;
                return _bucketlist2.default.create({
                  name: name,
                  created_by: req.user.id
                });

              case 9:
                newBucketlist = _context.sent;

                if (newBucketlist) {
                  _context.next = 12;
                  break;
                }

                throw new Error("oops!, could not create the list, try again");

              case 12:
                return _context.abrupt("return", res.status(201).json({
                  status: "success",
                  message: "Bucketlist created successfully",
                  data: newBucketlist
                }));

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context.t0.message
                }));

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 15]]);
      }));

      function createBucketlist(_x, _x2) {
        return _createBucketlist.apply(this, arguments);
      }

      return createBucketlist;
    }()
    /*
     *
     * controller to get all user bucketlist
     * required: name, created_by
     *
     */

  }, {
    key: "fetchAllBucketlist",
    value: function () {
      var _fetchAllBucketlist = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$query, limit, q, bucketlist, _bucketlist, bucketlists;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$query = req.query, limit = _req$query.limit, q = _req$query.q; // perform pagination if limit exists

                if (!limit) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 5;
                return _bucketlist2.default.findAll({
                  limit: limit,
                  where: {
                    created_by: req.user.id
                  }
                });

              case 5:
                bucketlist = _context2.sent;

                if (bucketlist) {
                  _context2.next = 8;
                  break;
                }

                throw new Error("could not retrieve the bucketlist");

              case 8:
                return _context2.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "bucketlist retrieved successfully",
                  data: bucketlist
                }));

              case 9:
                if (!q) {
                  _context2.next = 16;
                  break;
                }

                _context2.next = 12;
                return _bucketlist2.default.findAll({
                  where: {
                    created_by: req.user.id,
                    name: _defineProperty({}, Op.like, "%".concat(q, "%"))
                  }
                });

              case 12:
                _bucketlist = _context2.sent;

                if (_bucketlist) {
                  _context2.next = 15;
                  break;
                }

                throw new Error("could not retrieve the bucketlist");

              case 15:
                return _context2.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "bucketlist retrieved successfully",
                  data: _bucketlist
                }));

              case 16:
                _context2.next = 18;
                return _bucketlist2.default.findAll({
                  include: [{
                    model: _item.default,
                    as: "items"
                  }],
                  where: {
                    created_by: req.user.id
                  }
                });

              case 18:
                bucketlists = _context2.sent;

                if (bucketlists) {
                  _context2.next = 21;
                  break;
                }

                throw new Error("could not retrieve the bucketlists");

              case 21:
                return _context2.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "bucketlist retrieved successfully",
                  data: bucketlists
                }));

              case 24:
                _context2.prev = 24;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context2.t0.message
                }));

              case 27:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 24]]);
      }));

      function fetchAllBucketlist(_x3, _x4) {
        return _fetchAllBucketlist.apply(this, arguments);
      }

      return fetchAllBucketlist;
    }()
    /*
     *
     * controller to get a single user bucketlist
     * required: name, created_by
     *
     */

  }, {
    key: "fetchBucketlist",
    value: function () {
      var _fetchBucketlist = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var id, bucketlist;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                id = req.params.id;
                _context3.next = 4;
                return _bucketlist2.default.findOne({
                  include: [{
                    model: _item.default,
                    as: "items"
                  }],
                  where: {
                    id: id,
                    created_by: req.user.id
                  }
                });

              case 4:
                bucketlist = _context3.sent;

                if (bucketlist) {
                  _context3.next = 8;
                  break;
                }

                console.log(bucketlist);
                throw new Error("could not retrieve the bucketlist");

              case 8:
                return _context3.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "bucketlist retrieved successfully",
                  data: bucketlist
                }));

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context3.t0.message
                }));

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 11]]);
      }));

      function fetchBucketlist(_x5, _x6) {
        return _fetchBucketlist.apply(this, arguments);
      }

      return fetchBucketlist;
    }()
    /*
     *
     * controller to update a single user bucketlist
     * required: name, created_by
     *
     */

  }, {
    key: "updateBucketlist",
    value: function () {
      var _updateBucketlist = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var id, name, bucketlist, updatedBucketList;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                id = req.params.id;
                name = req.body.name;
                _context4.next = 5;
                return _bucketlist2.default.findOne({
                  where: {
                    id: id,
                    created_by: req.user.id
                  }
                });

              case 5:
                bucketlist = _context4.sent;

                if (bucketlist) {
                  _context4.next = 8;
                  break;
                }

                throw new Error("could not retrieve the bucketlist");

              case 8:
                if (!(name === bucketlist.name)) {
                  _context4.next = 10;
                  break;
                }

                throw new Error("please modify the bucketlist name or cancel");

              case 10:
                _context4.next = 12;
                return _bucketlist2.default.update({
                  name: name
                }, {
                  where: {
                    id: id,
                    created_by: req.user.id
                  }
                });

              case 12:
                updatedBucketList = _context4.sent;

                if (updatedBucketList) {
                  _context4.next = 15;
                  break;
                }

                throw new Error("could not modify this bucketlist");

              case 15:
                return _context4.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "bucketlist retrieved successfully"
                }));

              case 18:
                _context4.prev = 18;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context4.t0.message
                }));

              case 21:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 18]]);
      }));

      function updateBucketlist(_x7, _x8) {
        return _updateBucketlist.apply(this, arguments);
      }

      return updateBucketlist;
    }()
    /*
     *
     * controller to delete a single user bucketlist
     * required: name, created_by
     *
     */

  }, {
    key: "deleteBucketlist",
    value: function () {
      var _deleteBucketlist = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var id, bucketlist;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                id = req.params.id;
                _context5.next = 4;
                return _bucketlist2.default.destroy({
                  where: {
                    id: id,
                    created_by: req.user.id
                  }
                });

              case 4:
                bucketlist = _context5.sent;

                if (bucketlist) {
                  _context5.next = 7;
                  break;
                }

                throw new Error("could not delete the bucketlist");

              case 7:
                return _context5.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "bucketlist deleted successfully"
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

      function deleteBucketlist(_x9, _x10) {
        return _deleteBucketlist.apply(this, arguments);
      }

      return deleteBucketlist;
    }()
  }]);

  return BucketlistController;
}();

var _default = BucketlistController;
exports.default = _default;