import { Router } from "express";
import { userController } from "../controllers/userController";
import { userValidators } from "../validators/userValidators";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";

class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
    this.router.get(
      "/otpLogin",
      userValidators.otpLogin(),
      GlobalMiddleWare.checkError,
      userController.otpLogin
    ),
      this.router.get(
        "/registerUserViaPhone",
        userValidators.registerUserViaPhone(),
        GlobalMiddleWare.checkError,
        userController.registerUserViaPhone
      ),
      this.router.get(
        "/send/verification/email",
        GlobalMiddleWare.auth,
        userController.resendVerificationEmail
      ),
      this.router.get(
        "/login",
        userValidators.login(),
        GlobalMiddleWare.checkError,
        userController.login
      ),
      this.router.get(
        "send/reset/password/token",
        userValidators.checkResetPasswordEmail(),
        GlobalMiddleWare.checkError,
        userController.sendResetPasswordOtp
      ),
      this.router.get(
        "/verify/resetPasswordToken",
        userValidators.verifyResetPasswordToken(),
        GlobalMiddleWare.checkError,
        userController.verifyResetPasswordToken
      ),
      this.router.get(
        "/profile",

        GlobalMiddleWare.auth,
        userController.profile
      );
  }

  postRoutes() {
    this.router.post(
      "/signup",
      userValidators.signup(),
      GlobalMiddleWare.checkError,
      userController.signup
    ),
      this.router.post(
        "/refresh_token",
        GlobalMiddleWare.decodeRefreshToken,
        userController.getNewTokens
      ),
      this.router.post(
        "/logout",
        GlobalMiddleWare.auth,
        GlobalMiddleWare.decodeRefreshToken,
        userController.logout
      );
  }

  patchRoutes() {
    this.router.patch(
      "/reset/password",
      userValidators.resetPassword(),
      GlobalMiddleWare.checkError,
      userController.resetPassword
    ),
      this.router.patch(
        "/verify/emailToken",
        GlobalMiddleWare.auth,
        userValidators.verifyUserEmailToken(),
        GlobalMiddleWare.checkError,
        userController.verifyUserEmailToken
      ),
      this.router.patch(
        "/update/phone",
        GlobalMiddleWare.auth,
        userValidators.verifyPhoneNumber(),
        GlobalMiddleWare.checkError,
        userController.updatePhoneNumber
      ),
      this.router.patch(
        "/update/profile",
        GlobalMiddleWare.auth,
        userValidators.verifyUserProfile(),
        GlobalMiddleWare.checkError,
        userController.updateUserProfile
      );
  }
  putRoutes() {
    this.router.patch(
      "/update/profilePic",
      GlobalMiddleWare.auth,
      new Utils().multer.single("profileImages"),
      userValidators.userProfilePic,
      GlobalMiddleWare.checkError,
      userController.updateUserProfilePic
    );
  }
  deleteRoutes() {}
}

export default new UserRouter().router;
