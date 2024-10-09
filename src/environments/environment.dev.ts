import { Utils } from "../utils/Utils";
import { environment } from "./environment";

Utils.dotenvconfigs();

export const DevEnvironment: environment = {
  db_url: process.env.DEV_DB_URL,
  jwt_secret_key: process.env.DEV_JWT_SECRET_KEY,
  jwt_refresh_secret_key: process.env.DEV_JWT_REFRESH_SECRET_KEY,
  sendgrid: {
    api_key: process.env.DEV_SENDGRID_API_KEY,
    email_from: process.env.DEV_SENDGRID_SENDER_EMAIL,
  },
  // gmail_auth: {
  //   user: process.env.DEV_GMAIL_USER,
  //   pass: process.env.DEV_GMAIL_PASS,
  // },
  redis: {
    username: null,
    password: null,
    host: process.env.LOCAL_REDIS_HOST,
    port: parseInt(process.env.LOCAL_REDIS_PORT),
  },
};
