import { Router } from "express";

import Appointment from "../models/Appointments";
import AppointmentRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";
import UpdateAppointmentService from "../services/UpdateAppointmentService";

const appointmentRoute = Router();
const appointmentRepository = new AppointmentRepository();
const createAppointmentService = new CreateAppointmentService(
  appointmentRepository
);
const updateAppointmentService = new UpdateAppointmentService(
  appointmentRepository
);

appointmentRoute.get("/", (_, response) => {
  const appointments = appointmentRepository.all();
  return response.json(appointments);
});

appointmentRoute.post("/", (request, response) => {
  const { name, email }: Appointment = request.body;
  const appointment = createAppointmentService.execute({ name, email });
  return response.json(appointment);
});

appointmentRoute.put("/:id", (request, response) => {
  try {
    const { id } = request.params;
    const { name, email }: Appointment = request.body;

    const find = updateAppointmentService.execute({ id, name, email });
    return response.json(find);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

appointmentRoute.delete("/:id", (request, response) => {
  const { id } = request.params;

  const del = appointmentRepository.delete(id);

  if (del) {
    return response.json(del);
  }
  return response.status(400).json({ error: "user not found" });
});

export default appointmentRoute;
