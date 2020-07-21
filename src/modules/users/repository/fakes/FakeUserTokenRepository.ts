import IUserTokenRepository from '@modules/users/repository/IUserTokenRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { uuid } from 'uuidv4';

class FakeUserTokenRepository implements IUserTokenRepository {
  private usersTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const usersToken = new UserToken();

    Object.assign(usersToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.usersTokens.push(usersToken);

    return usersToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.usersTokens.find(
      findToken => findToken.token === token,
    );

    return userToken;
  }
}

export default FakeUserTokenRepository;
