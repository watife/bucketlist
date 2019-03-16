import "@babel/polyfill";
import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
// import swaggerUi from "swagger-ui-express";
import { config } from "dotenv";
import sequelize from "./utils/db";

// import models

/*
 *
 * ROUTES FOR THE APPLICATION
 *
 */

// import mealRoutes from "./routes/meal.routes";
// import menuRoutes from "./routes/menu.routes";
// import ordersRoutes from "./routes/order.routes";
// import catererRoutes from "./routes/caterer.routes";
// import customerRoutes from "./routes/customer.routes";
// import categoryRoutes from "./routes/category.routes";
// import swaggerjson from "./swagger.json";

config();

const PORT = process.env.PORT || 3000;
const app = express(); // setup express application

app.use(cors());
app.use(logger("dev")); // log requests to the console
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerjson));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) =>
  res.status(200).send({
    message: "Welcome to the default API route"
  })
);

/**
 * db connection
 */
sequelize
  .sync()
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
 * MODELS ASSOCIATION
 *
 */

/*
 *
 * Meals Routes
 *
 */
// app.use("/api/v1/meals/", mealRoutes);

export default app;
