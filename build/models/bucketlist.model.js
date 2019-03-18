"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = _interopRequireDefault(require("../utils/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bucketlist = _db.default.define("bucket_list", {
  id: {
    type: _sequelize.default.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: _sequelize.default.STRING,
    allowNull: false
  },
  createdAt: _sequelize.default.DATE,
  updatedAt: _sequelize.default.DATE
});

var _default = Bucketlist;
exports.default = _default;