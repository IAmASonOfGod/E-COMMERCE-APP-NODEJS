import * as nodemailer from "nodemailer";
import * as sendGrid from "nodemailer-sendgrid-transport";
import { getEnvironmentVariables } from "../environments/environment";

export class Nodemailer {
  private static initiateTransport() {
    return nodemailer.createTransport(
      sendGrid({
        auth: {
          api_key: getEnvironmentVariables().sendgrid.api_key,
        },
      })

      // {
      //   service: "gmail",
      //   auth: {
      //     user: getEnvironmentVariables().gmail_auth.user,
      //     pass: getEnvironmentVariables().gmail_auth.user,
      //   },
      // }

      // Note: https://myaccount.google.com/lesssecureapps
    );
  }

  static sendMail(data: {
    to: [string];
    subject: string;
    html: string;
  }): Promise<any> {
    return Nodemailer.initiateTransport().sendMail({
      // from: getEnvironmentVariables().sendgrid.email_from,
      // from: getEnvironmentVariables().gmail_auth.user,
      to: data.to,
      subject: data.subject,
      html: data.html,
    });
  }
}
