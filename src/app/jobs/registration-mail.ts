import SMTPTransport from "nodemailer/lib/smtp-transport";
import { mail } from "../lib/mail";

interface User {
  name: string;
  email: string;
  password: string;
}

export class RegistrationMail {
  key: "RegistrationMail";

  async handle(user: User): Promise<SMTPTransport.SentMessageInfo> {
    return await mail.sendMail({
      from: "Queue Test <queue@queuetest.com.br>",
      to: `${user.name} <${user.email}>`,
      subject: "Cadastro de usuário",
      html: `Olá, ${user.name}, bem-vindo ao sistema de filas`,
    });
  }
}
