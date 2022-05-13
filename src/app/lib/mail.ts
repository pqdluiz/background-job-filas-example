import nodemailer from "nodemailer";
import { configMail } from "../../config/mail";

export const mail = nodemailer.createTransport(configMail);
