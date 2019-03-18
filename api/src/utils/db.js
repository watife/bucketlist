import Sequelize from "sequelize";
import { config } from "dotenv";

config();

const db = new Sequelize(process.env.DATABASE_URL, {
  logging: false
});

export default db;
