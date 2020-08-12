import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repository/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersServices';

let fakeUsersRepository: FakeUsersRepository;
let listProfile: ListProvidersService;

describe('List Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProfile = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the profile', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'mario one',
      email: 'marchettione@gmail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'mario two',
      email: 'marchettitwo@gmail.com',
      password: '123456',
    });

    const userLogged = await fakeUsersRepository.create({
      name: 'mario three',
      email: 'marchettithree@gmail.com',
      password: '123456',
    });

    const providers = await listProfile.execute({
      user_id: userLogged.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
