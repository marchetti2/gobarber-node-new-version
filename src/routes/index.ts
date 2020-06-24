import {Router} from 'express';
import {uuid} from 'uuidv4';

import appointmentRoute from './appointment.routes'

const routes = Router();
routes.use('/appointments', appointmentRoute)

export default routes;