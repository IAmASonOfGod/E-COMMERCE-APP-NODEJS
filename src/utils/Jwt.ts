import { getEnvironmentVariables } from "../environments/environment";
import * as Jwt from "jsonwebtoken";
import { Redis } from "./Redis";

export class JWT {
  static jwtSign(payload, userId, expiresIn: string = "1h") {
    return Jwt.sign(payload, getEnvironmentVariables().jwt_secret_key, {
      expiresIn: expiresIn,
      audience: userId.toString(),
      issuer: "tecknyks.com",
    });
  }

  static jwtVerify(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      Jwt.verify(
        token,
        getEnvironmentVariables().jwt_secret_key,
        (err, decoded) => {
          if (err) reject(err);
          else if (!decoded) reject(new Error("User is not authorised."));
          else resolve(decoded);
        }
      );
    });
  }

  static async jwtSignRefreshToken(
    payload,
    userId,
    expiresIn: string = "1y",
    redis_ex: number = 365 * 24 * 60 * 60
  ) {
    try {
      const refreshToken = Jwt.sign(
        payload,
        getEnvironmentVariables().jwt_refresh_secret_key,
        {
          expiresIn: expiresIn,
          audience: userId.toString(),
          issuer: "tecknyks.com",
        }
      );
      // set refresh token in Redis with key userId
      await Redis.setValue(userId.toString(), refreshToken, redis_ex);
      return refreshToken;
    } catch (e) {
      throw e;
    }
  }

  static jwtVerifyRefreshToken(refreshToken: string): Promise<any> {
    return new Promise((resolve, reject) => {
      Jwt.verify(
        refreshToken,
        getEnvironmentVariables().jwt_refresh_secret_key,
        (err, decoded) => {
          if (err) reject(err);
          else if (!decoded) reject(new Error("User is not authorised."));
          else {
            const user: any = decoded;
            Redis.getValue(user.aud)
              .then((value) => {
                if (value === refreshToken) resolve(decoded);
                else
                  reject(
                    new Error("Your Session is Expired! Please Login Again")
                  );
              })
              .catch((e) => {
                reject(e);
              });
          }
        }
      );
    });
  }
}
