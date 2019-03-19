import Sequelize from "sequelize";
import db from "../utils/db";

const Bucketlist = db.define("bucket_list", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

export default Bucketlist;
