import { DevEnvironment } from "./environment.dev";
import { ProdEnvironment } from "./environment.prod";

export interface environment {
  db_url: string;
  jwt_secret_key: string;
  jwt_refresh_secret_key: string;
  sendgrid?: {
    api_key: string;
    email_from: string;
  };
  // gmail_auth?: {
  //   user: string;
  //   pass: string;
  // };
  redis?: {
    username: string;
    password: string;
    host: string;
    port: number;
  };
}

export function getEnvironmentVariables() {
  const env =
    process.env.NODE_ENV === "production" ? ProdEnvironment : DevEnvironment;

  if (!env.db_url) {
    throw new Error("Database URL is not set.");
  }

  if (!env.jwt_secret_key) {
    throw new Error("JWT Secret Key is not set.");
  }

  return env;
}
