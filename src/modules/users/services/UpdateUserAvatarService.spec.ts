import FakeUsersRepository from '@modules/users/repository/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';

describe('Update Avatar', () => {
  it('should be able to update a avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'mario Luiz',
      email: 'marchetti2@gmail.com',
      password: '123456',
    });

    await updateAvatar.execute({
      user_id: user.id,
      avatarFilename: 'tois.png',
    });

    expect(user.avatar).toBe('tois.png');
  });

  it('should not be able to update a avatar with a non exist user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    expect(
      updateAvatar.execute({
        user_id: 'non',
        avatarFilename: 'tois.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'mario Luiz',
      email: 'marchetti2@gmail.com',
      password: '123456',
    });

    await updateAvatar.execute({
      user_id: user.id,
      avatarFilename: 'tois.png',
    });

    await updateAvatar.execute({
      user_id: user.id,
      avatarFilename: 'tois2.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('tois.png');
    expect(user.avatar).toBe('tois2.png');
  });
});
