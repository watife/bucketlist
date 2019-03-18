"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jwt = _interopRequireDefault(require("../utils/jwt"));

var _user = _interopRequireDefault(require("../models/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "userRegister",

    /*
     *
     * controller to signup a user
     * required: name, email, password
     *
     */
    value: function () {
      var _userRegister = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, name, email, password, hash, userCheck, newUser, savedUser, jwtToken;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
                _context.next = 4;
                return _bcrypt.default.hash(password, 10);

              case 4:
                hash = _context.sent;
                _context.next = 7;
                return _user.default.findOne({
                  where: {
                    email: email
                  }
                });

              case 7:
                userCheck = _context.sent;

                if (!userCheck) {
                  _context.next = 10;
                  break;
                }

                throw new Error("User with this email already exists");

              case 10:
                _context.next = 12;
                return _user.default.create({
                  name: name,
                  email: email,
                  password: hash
                });

              case 12:
                newUser = _context.sent;

                if (newUser) {
                  _context.next = 15;
                  break;
                }

                throw new Error("Could not signup, try some other time");

              case 15:
                // get the new user to be saved for jwt
                savedUser = {
                  id: newUser.id,
                  name: newUser.name,
                  email: newUser.email
                };
                jwtToken = _jsonwebtoken.default.sign({
                  user: savedUser,
                  isUser: true
                }, _jwt.default, {
                  expiresIn: 86400
                });
                return _context.abrupt("return", res.status(201).json({
                  status: "success",
                  message: "User Registered",
                  token: "Bearer ".concat(jwtToken),
                  data: savedUser
                }));

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context.t0.message
                }));

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 20]]);
      }));

      function userRegister(_x, _x2) {
        return _userRegister.apply(this, arguments);
      }

      return userRegister;
    }()
    /*
     *
     * controller to login a user
     * required: email, password
     *
     */

  }, {
    key: "userLogin",
    value: function () {
      var _userLogin = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body2, email, password, user, Comparehash, savedUser, jwtToken;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                _context2.next = 4;
                return _user.default.findOne({
                  where: {
                    email: email
                  }
                });

              case 4:
                user = _context2.sent;

                if (user) {
                  _context2.next = 7;
                  break;
                }

                throw new Error("Invalid email or password");

              case 7:
                _context2.next = 9;
                return _bcrypt.default.compare(password, user.password);

              case 9:
                Comparehash = _context2.sent;

                if (Comparehash) {
                  _context2.next = 12;
                  break;
                }

                throw new Error("Invalid email or password");

              case 12:
                savedUser = {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  phone: user.phone
                };
                jwtToken = _jsonwebtoken.default.sign({
                  user: savedUser,
                  isUser: true
                }, _jwt.default, {
                  expiresIn: 86400
                });
                return _context2.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "User Logged In",
                  token: "Bearer ".concat(jwtToken),
                  data: savedUser
                }));

              case 17:
                _context2.prev = 17;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context2.t0.message
                }));

              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 17]]);
      }));

      function userLogin(_x3, _x4) {
        return _userLogin.apply(this, arguments);
      }

      return userLogin;
    }()
  }]);

  return UserController;
}();

var _default = UserController;
exports.default = _default;