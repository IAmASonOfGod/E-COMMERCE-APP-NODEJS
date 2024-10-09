import { body, query } from "express-validator";
import User from "../models/User";

export class userValidators {
  static registerUserViaPhone() {
    return [
      query("phone", "Phone number is required")
        .isString()
        .custom((phone, { req }) => {
          return User.findOne({
            phone,
            type: "user",
          })
            .then((user) => {
              if (user) {
                req.user = user;

                // throw new Error("User Already Exists");
                // throw "User already exists";
              } else {
                return true;
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
    ];
  }

  static otpLogin() {
    return [
      query("phone", "Phone number is required").isString(),
      query("otp", "OTP is required").isNumeric(),
    ];
  }

  static signup() {
    return [
      body("name", "Name is required").isString(),
      body("phone", "Phone number is required").isString(),
      body("email", "Name is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({
            email: email,
            //  type: "user"
          })
            .then((user) => {
              if (user) {
                // throw new Error("User Already Exists");
                throw "User already exists";
              } else {
                return true;
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      body("password", "Name is required")
        .isAlphanumeric()
        .isLength({ min: 8, max: 25 })
        .withMessage("Password must be between 8-10 characters"),
      body("type", "User role type is required").isString(),
      body("status", "User status is required").isString(),
    ];
  }

  static verifyUserEmailToken() {
    return [body("verification", "Email verification is required").isNumeric()];
  }

  static login() {
    return [
      query("email", "Name is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({
            email: email,
          })
            .then((user) => {
              if (user) {
                // check role
                if (
                  user.type == "user" ||
                  user.type == "admin" ||
                  user.type == "store"
                ) {
                  req.user = user;
                  return true;
                } else {
                  throw "No user registered with such email";
                }
              } else {
                throw "No user registered with such email";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      query("password", "Name is required").isAlphanumeric(),
    ];
  }

  static checkResetPasswordEmail() {
    return [
      query("email", "Name is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({
            email: email,
          })
            .then((user) => {
              if (user) {
                return true;
              } else {
                throw "No user registered with such email";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
    ];
  }

  static verifyResetPasswordToken() {
    return [
      query("email", "Name is required").isEmail(),
      query("reset_password_token", "Reset password token is required")
        .isNumeric()
        .custom((reset_password_token, { req }) => {
          return User.findOne({
            email: req.query.email,
            reset_password_token: reset_password_token,
            reset_password_token_time: { $gt: Date.now() },
          })
            .then((user) => {
              if (user) {
                return true;
              } else {
                throw "Reset password token does't exist. Please regenerate a new token.";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
    ];
  }

  static resetPassword() {
    return [
      body("email", "Name is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({
            email: email,
          })
            .then((user) => {
              if (user) {
                req.user = user;
                return true;
              } else {
                throw "No user registered with such email.";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      body("new_password", "New password is required").isAlphanumeric(),
      body("reset_password_token", "Reset password token is required")
        .isNumeric()
        .custom((reset_password_token, { req }) => {
          if (req.user.reset_password_token === reset_password_token) {
            return true;
          } else {
            req.errorStatus = 422;

            throw "Reset password token is invalid, please try again.";
          }
        }),
    ];
  }

  static verifyPhoneNumber() {
    return [body("phone", "Phone is required").isString()];
  }

  static verifyUserProfile() {
    return [
      body("phone", "Phone is required").isString(),
      body("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({
            email: email,
          })
            .then((user) => {
              if (!user) {
                throw "A User with entered email already exist, please provide a unique email id.";
              } else {
                return true;
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      body("Password", "Password is required").isAlphanumeric(),
    ];
  }

  static verifyCustomerProfile() {
    return [
      body("name", "Name is required").isString(),
      body("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({
            email: email,
          })
            .then((user) => {
              if (!user) {
                throw "A User with entered email already exist, please provide a unique email id.";
              } else {
                return true;
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
    ];
  }

  // static checkRefreshToken() {
  //   return [
  //     body("refreshToken", "Refresh token is required")
  //       .isString()
  //       .custom((refreshToken, { req }) => {
  //         if (refreshToken) {
  //           return true;
  //         } else {
  //           req.errorstatus = 403;
  //           throw "Access is forbidden";
  //         }
  //       }),
  //   ];
  // }

  static userProfilePic() {
    body("profileImages", "Profile image is required").custom(
      (value, { req }) => {
        if (req.file) {
          return true;
        } else {
          throw new Error("File not uploaded");
        }
      }
    );
  }
}
