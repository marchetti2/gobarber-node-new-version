import { Router } from 'express';

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentRouter.use(ensureAutheticated);

// appointmentRoute.get('/', async (request, response) => {

//   const appointments = await appointmentRepository.find();
//   return response.json(appointments);
// });

appointmentRouter.post('/', appointmentsController.create);

export default appointmentRouter;
