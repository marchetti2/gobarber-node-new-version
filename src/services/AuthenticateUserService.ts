import { getRepository } from "typeorm";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import User from "../models/Users";
import auth from "../config/auth";

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new Error("User/Password incorrect");
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("User/Password incorrect");
    }

    const { secret, expiresIn } = auth.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
