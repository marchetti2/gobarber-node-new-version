import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentRoute = Router();
appointmentRoute.use(ensureAutheticated);

appointmentRoute.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();
  return response.json(appointments);
});

appointmentRoute.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const parseDate = parseISO(date);
  const createAppointmentService = new CreateAppointmentService();
  const appointment = await createAppointmentService.execute({
    provider_id,
    date: parseDate,
  });
  return response.json(appointment);
});

export default appointmentRoute;
