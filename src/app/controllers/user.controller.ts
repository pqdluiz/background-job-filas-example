import { QueueConfig } from "../lib/queue";

import { Request, Response } from "express";

interface User {
  name: string;
  email: string;
  password: string;
}

const queuesConfig = new QueueConfig();

export class UserController {
  async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const user: User = {
      name,
      email,
      password,
    };

    await queuesConfig.add("RegistrationMail", { user });
    await queuesConfig.add("UserReport", { user });

    return response.status(201).json(user);
  }
}
