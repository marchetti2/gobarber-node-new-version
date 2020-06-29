import { Router } from 'express';

import usersRoute from '@modules/users/infra/http/routes/users.routes';
import sessionRoute from '@modules/users/infra/http/routes/sessions.routes';
import appointmentRoute from '@modules/appointments/infra/http/routes/appointment.routes';

const routes = Router();
routes.use('/users', usersRoute);
routes.use('/session', sessionRoute);
routes.use('/appointments', appointmentRoute);

export default routes;
