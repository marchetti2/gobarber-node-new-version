import { Router, request } from "express";
import { getCustomRepository } from "typeorm";
import { parseISO } from "date-fns";

import AppointmentRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";
import ensureAutheticated from "../middlewares/ensureAuthenticated";

const appointmentRoute = Router();
const createAppointmentService = new CreateAppointmentService();

appointmentRoute.use(ensureAutheticated);

appointmentRoute.get("/", async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();
  console.log(request.user);
  return response.json(appointments);
});

appointmentRoute.post("/", async (request, response) => {
  try {
    const { provider_id, date } = request.body;
    const parseDate = parseISO(date);
    const appointment = await createAppointmentService.execute({
      provider_id,
      date: parseDate,
    });
    return response.json(appointment);
  } catch (err) {
    return response.json({ error: err.message });
  }
});

export default appointmentRoute;
