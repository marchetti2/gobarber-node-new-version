import { getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/Users';
import auth from '@config/auth';

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
      where: { email },
    });
    if (!user) {
      throw new AppError('User/Password incorrect', 401);
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError('User/Password incorrect', 401);
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
