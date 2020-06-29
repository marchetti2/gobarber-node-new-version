import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import User from '@modules/users/infra/typeorm/entities/Users';
import CreateUserService from '@modules/users//services/CreateUserService';
import UpdateUserAvatarService from '@modules/users//services/UpdateUserAvatarService';
import uploadConfig from '@config/upload';

const usersRoute = Router();
const upload = multer(uploadConfig);

usersRoute.get('/', async (_, response) => {
  const appointmentRepository = getRepository(User);
  const appointments = await appointmentRepository.find();
  return response.json(appointments);
});

usersRoute.post('/', async (request, response) => {
  try {
    const createAppointmentService = new CreateUserService();
    const { name, email, password }: User = request.body;
    const user = await createAppointmentService.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.json({ error: err.message });
  }
});

usersRoute.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatarService = new UpdateUserAvatarService();

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRoute;
