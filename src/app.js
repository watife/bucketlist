import "@babel/polyfill";
import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { config } from "dotenv";
import db from "./utils/db";

/**
 *
 * Import Models
 *
 */
import User from "./models/user.model";
import Bucketlist from "./models/bucketlist.model";
import Item from "./models/item.model";

/*
 *
 * ROUTES FOR THE APPLICATION
 *
 */
import userRoutes from "./routes/user.routes";
import bucketlistRoutes from "./routes/bucketlist.routes";
import swaggerjson from "./swagger.json";

config();

const PORT = process.env.PORT || 3000;
const app = express(); // setup express application

app.use(cors());
app.use(logger("dev")); // log requests to the console
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerjson));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) =>
  res.status(200).send({
    message: "Welcome to the default API route"
  })
);

/*
 *
 * MODELS ASSOCIATION
 *
 */

Bucketlist.belongsTo(User, { foreignKey: "created_by" }); // user can have many bucketlists

User.hasMany(Bucketlist, { foreignKey: "created_by" }); // user when called can assess all associated bucketlists

Item.belongsTo(Bucketlist, {
  foreignKey: "bucketlist_id",
  onDelete: "CASCADE"
}); // bucketlist can have many items

Bucketlist.hasMany(Item, {
  foreignKey: "bucketlist_id"
}); // buckelist when called can assess all associated items

/**
 * db connection
 */
db.sync()
  .then(() => {
    console.log(`DB Connection has been established on port ${PORT}`);
    app.listen(PORT, null, null, () => {
      app.emit("dbConnected");
    });
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

/*
 *
 * User Routes
 *
 */
app.use("/api/v1/auth/", userRoutes);

/*
 *
 * bucketlist Routes
 *
 */
app.use("/api/v1/bucketlists", bucketlistRoutes);

export default app;
