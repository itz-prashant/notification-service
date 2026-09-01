import config from "config";
import nodemailer, { Transporter } from "nodemailer";
import { Message, NotificationTransport } from "./types/notification-types";

export class MailTransport implements NotificationTransport {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.get("mail.host"),
      port: config.get("mail.port"),
      secure: false,
      auth: {
        user: config.get("mail.auth.user"),
        pass: config.get("mail.auth.pass"),
      },
    });
  }
  async send(message: Message): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: config.get("mail.from"), // sender address
        to: message.to, // list of recipients
        subject: message.subject, // subject line
        text: message.text, // plain text body
        html: message.html, // HTML body
      });

      console.log("Message sent: %s", info.messageId);

    } catch (err) {
      console.error("Error while sending mail:", err);
    }
  }
}