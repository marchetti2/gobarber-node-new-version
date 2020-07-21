import FakeUsersRepository from '@modules/users/repository/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authUser: AuthenticateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'mario Luiz',
      email: 'marchetti2@gmail.com',
      password: '123456',
    });

    const response = await authUser.execute({
      email: 'marchetti2@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should not be able to authenticate with non existing user ', async () => {
    await expect(
      authUser.execute({
        email: 'marchetti2@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate with non existing password ', async () => {
    await createUser.execute({
      name: 'mario Luiz',
      email: 'marchetti2@gmail.com',
      password: '123456',
    });

    await expect(
      authUser.execute({
        email: 'marchetti2@gmail.com',
        password: 'assass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
