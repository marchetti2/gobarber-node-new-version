import { Router, request } from "express";
import { getCustomRepository } from "typeorm";
import { parseISO } from "date-fns";

import AppointmentRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";
import ensureAutheticated from "../middlewares/ensureAuthenticated";

const appointmentRoute = Router();
appointmentRoute.use(ensureAutheticated);

appointmentRoute.get("/", async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();
  return response.json(appointments);
});

appointmentRoute.post("/", async (request, response) => {
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
