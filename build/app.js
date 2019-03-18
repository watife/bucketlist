"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _dotenv = require("dotenv");

var _db = _interopRequireDefault(require("./utils/db"));

var _user = _interopRequireDefault(require("./models/user.model"));

var _bucketlist = _interopRequireDefault(require("./models/bucketlist.model"));

var _item = _interopRequireDefault(require("./models/item.model"));

var _user2 = _interopRequireDefault(require("./routes/user.routes"));

var _bucketlist2 = _interopRequireDefault(require("./routes/bucketlist.routes"));

var _swagger = _interopRequireDefault(require("./swagger.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * Import Models
 *
 */

/*
 *
 * ROUTES FOR THE APPLICATION
 *
 */
(0, _dotenv.config)();
var PORT = process.env.PORT || 3000;
var app = (0, _express.default)(); // setup express application

app.use((0, _cors.default)());
app.use((0, _morgan.default)("dev")); // log requests to the console

app.use("/api-docs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default)); // Parse incoming requests data

app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.get("/", function (req, res) {
  return res.status(200).send({
    message: "Welcome to the default API route"
  });
});
/*
 *
 * MODELS ASSOCIATION
 *
 */

_bucketlist.default.belongsTo(_user.default, {
  foreignKey: "created_by"
}); // user can have many bucketlists


_user.default.hasMany(_bucketlist.default, {
  foreignKey: "created_by"
}); // user when called can assess all associated bucketlists


_item.default.belongsTo(_bucketlist.default, {
  foreignKey: "bucketlist_id",
  onDelete: "CASCADE"
}); // bucketlist can have many items


_bucketlist.default.hasMany(_item.default, {
  foreignKey: "bucketlist_id"
}); // buckelist when called can assess all associated items

/**
 * db connection
 */


_db.default.sync().then(function () {
  console.log("DB Connection has been established on port ".concat(PORT));
  app.listen(PORT, null, null, function () {
    app.emit("dbConnected");
  });
}).catch(function (err) {
  console.error("Unable to connect to the database:", err);
});
/*
 *
 * User Routes
 *
 */


app.use("/api/v1/auth/", _user2.default);
/*
 *
 * bucketlist Routes
 *
 */

app.use("/api/v1/bucketlists", _bucketlist2.default);
var _default = app;
exports.default = _default;