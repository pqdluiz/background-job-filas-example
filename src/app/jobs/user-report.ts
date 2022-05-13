interface User {
  name: string;
  email: string;
  password: string;
}

export class UserReport {
  key: "UserReport";

  options: {
    delay: 5000;
  };

  async handle(user: User): Promise<User> {
    console.log(user);
    return user;
  }
}
