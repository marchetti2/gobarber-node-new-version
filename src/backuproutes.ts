import { Router } from "express";
import { uuid } from "uuidv4";

import Appointment from "../models/Appointments";
import AppointmentRepository from "../repositories/AppointmentsRepository";

const appointmentRoute = Router();
const appointmentRepository = new AppointmentRepository();

appointmentRoute.get("/", (_, response) => {
  const appointments = appointmentRepository.all();
  return response.json(appointments);
});

appointmentRoute.post("/", (request, response) => {
  const { name, email }: Appointment = request.body;
  const appointment = appointmentRepository.create({ name, email });
  return response.json(appointment);
});

appointmentRoute.put("/:id", (request, response) => {
  const { id } = request.params;
  const { name, email }: Appointment = request.body;
  const find = appointmentRepository.changeById({ id, name, email });

  if (find) {
    return response.json(find);
  }
  return response.status(400).json({ error: "user not found" });
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

/*

appointmentRoute.put("/:id", (request, response) => {
  const { id } = request.params;
  const { name, email }: Appointment = request.body;

  const appointmentIndex = appointments.findIndex((appoi) => appoi.id === id);

  const newAppointment = new Appointment(name, email);

  if (appointmentIndex < 0) {
    return response.status(400).json({ error: "user not found" });
  }
  appointments[appointmentIndex] = newAppointment;
  return response.json(newAppointment);
});

appointmentRoute.delete("/:id", (request, response) => {
  const { id } = request.params;

  const appointmentIndex = appointments.findIndex((appoi) => appoi.id === id);

  if (appointmentIndex < 0) {
    return response.status(400).json({ error: "user not found" });
  }

  appointments.splice(appointmentIndex, 1);

  return response.json(appointments);
});

*/
