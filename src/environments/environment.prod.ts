import { Utils } from "../utils/Utils";
import { environment } from "./environment";

Utils.dotenvconfigs();

export const ProdEnvironment: environment = {
  db_url: process.env.PROD_DB_URL,
  jwt_secret_key: process.env.PROD_JWT_SECRET_KEY,
  jwt_refresh_secret_key: process.env.PROD_JWT_REFRESH_SECRET_KEY,
  sendgrid: {
    api_key: process.env.PROD_SENDGRID_API_KEY,
    email_from: process.env.PROD_SENDGRID_SENDER_EMAIL,
  },
  // gmail_auth: {
  //   user: process.env.PROD_GMAIL_USER,
  //   pass: process.env.PROD_GMAIL_PASS,
  // },
  redis: {
    username: process.env.SERVER_REDIS_USERNAME,
    password: process.env.SERVER_REDIS_PASSWORD,
    host: process.env.SERVER_REDIS_HOST,
    port: parseInt(process.env.SERVER_REDIS_PORT),
  },
};
