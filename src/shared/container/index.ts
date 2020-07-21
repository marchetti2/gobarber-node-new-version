import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from '@modules/appointments/repository/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repository/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repository/UsersRepository';

import IUserTokensRepository from '@modules/users/repository/IUserTokenRepository';
import UsersTokensRepository from '@modules/users/infra/typeorm/repository/UserTokensRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);
