"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _jwt = _interopRequireDefault(require("../utils/jwt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AuthController =
/*#__PURE__*/
function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }

  _createClass(AuthController, null, [{
    key: "verifyUserToken",
    value: function () {
      var _verifyUserToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var token, jwtToken, decoded;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                token = req.headers.authorization;

                if (token) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", res.status(401).json({
                  status: "error",
                  message: "Only Authenticated users are Authorized"
                }));

              case 3:
                jwtToken = token.split(" ")[1];
                _context.prev = 4;
                _context.next = 7;
                return _jsonwebtoken.default.verify(jwtToken, _jwt.default);

              case 7:
                decoded = _context.sent;

                if (decoded.isUser) {
                  _context.next = 10;
                  break;
                }

                throw new Error("Only Authenticated users are Authorized");

              case 10:
                req.user = decoded.user;
                next();
                return _context.abrupt("return", true);

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](4);
                return _context.abrupt("return", res.status(401).json({
                  status: "error",
                  message: "Only Authenticated users are Authorized"
                }));

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 15]]);
      }));

      function verifyUserToken(_x, _x2, _x3) {
        return _verifyUserToken.apply(this, arguments);
      }

      return verifyUserToken;
    }()
  }]);

  return AuthController;
}();

var _default = AuthController;
exports.default = _default;