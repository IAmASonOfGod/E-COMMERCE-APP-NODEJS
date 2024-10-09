import * as bcrypt from "bcrypt";
import * as multer from "multer";
import * as dotenv from "dotenv";

const storageOptions = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads" + file.fieldname);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export class Utils {
  public MAX_TOKEN_TIME = 5 * 60 * 1000; // 5 minutes
  public multer = multer({ storage: storageOptions, fileFilter: fileFilter });

  // Generates a verification token with the specified number of digits
  static generateVerificationToken(digit: number): string {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < digit; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    return otp;
  }

  // Encrypts a password using bcrypt
  static encryptPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  }

  // Compares a password with the encrypted password
  static async comparePassword(data: {
    password: string;
    encrypt_password: string;
  }): Promise<boolean> {
    return bcrypt.compare(data.password, data.encrypt_password).then((same) => {
      if (!same) {
        throw new Error("User & Password Do Not Match");
      }
      return true;
    });
  }

  static dotenvconfigs() {
    dotenv.config({ path: ".env" });
  }

  currentDate() {
    return new Date().toLocaleString("en-us", {
      timeZone: "Africa/Johannesburg",
    });
  }
}
