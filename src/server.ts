import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { getEnvironmentVariables } from "./environments/environment";
import UserRouter from "./routers/UserRouter";
import bannerRoutes from "./routers/bannerRoutes";
import cityRouter from "./routers/cityRouter";
import CategoryRouter from "./routers/CategoryRouter";
import itemRouter from "./routers/itemRouter";
import addressRouter from "./routers/addressRouter";
import orderRouter from "./routers/orderRouter";
import * as dotenv from "dotenv";
import { Utils } from "./utils/Utils";
import { Redis } from "./utils/Redis";
import subCategoryRouter from "./routers/subCategoryRouter";
import storeRouter from "./routers/storeRouter";
import cartRouter from "./routers/cartRouter";

export class Server {
  public app: express.Application = express();

  constructor() {
    this.setConfigs();
    this.setRoutes();
    this.error404handler();
    this.handleErrors();
  }

  setConfigs() {
    this.dotenvconfigs();
    this.connectMongoDB();
    this.connectRedis();
    this.configureBodyParser();
  }

  dotenvconfigs() {
    Utils.dotenvconfigs();
  }

  connectMongoDB() {
    const dbUrl = getEnvironmentVariables().db_url;

    mongoose
      .connect(dbUrl)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
      });
  }

  async connectRedis() {
    Redis.connectToRedis();
  }

  configureBodyParser() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  allowCors() {
    this.app.use(cors());
  }

  setRoutes() {
    this.app.use("/src/uploads", express.static("src/uploads"));
    this.app.use("/api/user", UserRouter);
    this.app.use("/api/banner", bannerRoutes);
    this.app.use("/api/city", cityRouter);
    this.app.use("/api/restaurant", storeRouter);
    this.app.use("/api/category", CategoryRouter);
    this.app.use("/api/sub_category", subCategoryRouter);
    this.app.use("/api/product", itemRouter);
    this.app.use("/api/address", addressRouter);
    this.app.use("/api/cart", cartRouter);
    this.app.use("/api/order", orderRouter);
  }

  error404handler() {
    this.app.use((req, res) => {
      res.status(404).json({
        message: "Not found",
        status_code: 404,
      });
    });
  }

  handleErrors() {
    this.app.use((error, req, res, next) => {
      const errorStatus = req.errorStatus || 500;

      res.status(errorStatus).json({
        message: error.message || "Something went wrong",
        status_code: errorStatus,
      });
    });
  }
}
