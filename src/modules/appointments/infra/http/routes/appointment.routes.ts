import { Router } from 'express';

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentRoute = Router();
const appointmentsController = new AppointmentsController();

appointmentRoute.use(ensureAutheticated);

// appointmentRoute.get('/', async (request, response) => {

//   const appointments = await appointmentRepository.find();
//   return response.json(appointments);
// });

appointmentRoute.post('/', appointmentsController.create);

export default appointmentRoute;
