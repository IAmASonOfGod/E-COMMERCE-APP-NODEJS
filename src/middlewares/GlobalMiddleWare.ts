import { validationResult } from "express-validator";
import { JWT } from "../utils/Jwt";

export class GlobalMiddleWare {
  static checkError(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(new Error(errors.array()[0].msg));
    } else {
      next();
    }
  }

  static async auth(req, res, next) {
    const header_auth = req.headers.authorization;
    const token = header_auth ? header_auth.slice(7, header_auth.length) : null;
    try {
      if (!token) {
        req.errorStatus = 401;
        next(new Error("User doesn't exist"));
      }
      const decoded = await JWT.jwtVerify(token);
      req.user = decoded;
      // console.log(req.user);
      next();
    } catch (e) {
      req.errorStatus = 401;
      // next(e);
      next(new Error("User doesn't exist"));
    }
  }

  static async decodeRefreshToken(req, res, next) {
    const refreshToken = req.body.refreshToken;

    try {
      if (!refreshToken) {
        req.errorstatus = 403;
        next(new Error("Access is forbidden! User doesn't exist"));
      }
      const decoded = await JWT.jwtVerify(refreshToken);
      req.user = decoded;
      // console.log(req.user);
      next();
    } catch (e) {
      req.errorStatus = 401;
      // next(e);
      next(new Error("Access is forbidden! User doesn't exist"));
    }
  }

  static adminRole(req, res, next) {
    const user = req.user;
    console.log(user);
    if (user.type !== "admin") {
      // req.errorStatus = 401;
      next(new Error("You are an unauthorised user"));
    }
    next();
  }

  static adminOrStoreRole(req, res, next) {
    const user = req.user;
    if (user.type !== "admin" || user.type == "store") {
      next();
      // req.errorStatus = 401;
      next(new Error("You are an unauthorised user"));
    }
    next();
  }
}
