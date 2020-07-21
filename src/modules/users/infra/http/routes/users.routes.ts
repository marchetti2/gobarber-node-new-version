import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import User from '@modules/users/infra/typeorm/entities/Users';
import uploadConfig from '@config/upload';
import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

// usersRoute.get('/', async (_, response) => {
//   const appointmentRepository = getRepository(User);
//   const appointments = await appointmentRepository.find();
//   return response.json(appointments);
// });

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
