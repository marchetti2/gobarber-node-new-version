import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { parseISO } from "date-fns";

import Appointment from "../models/Appointments";
import AppointmentRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentRoute = Router();
const createAppointmentService = new CreateAppointmentService();

appointmentRoute.get("/", async (_, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();
  return response.json(appointments);
});

appointmentRoute.post("/", async (request, response) => {
  const { provider_id, date } = request.body;
  try {
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
