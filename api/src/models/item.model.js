import Sequelize from "sequelize";
import db from "../utils/db";

const Item = db.define("item", {
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
  done: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});

export default Item;
