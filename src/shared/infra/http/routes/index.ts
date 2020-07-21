import { Router } from 'express';

import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionRoutes from '@modules/users/infra/http/routes/sessions.routes';
import appointmentRoutes from '@modules/appointments/infra/http/routes/appointment.routes';
import passwordRoutes from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();
routes.use('/users', usersRoutes);
routes.use('/session', sessionRoutes);
routes.use('/appointments', appointmentRoutes);
routes.use('/password', passwordRoutes);
routes.use('/profile', profileRouter);

export default routes;
