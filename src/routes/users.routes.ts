import { Router } from "express";
import { getRepository } from "typeorm";

import User from "../models/Users";
import CreateUserService from "../services/CreateUserService";

const usersRoute = Router();
const createAppointmentService = new CreateUserService();

usersRoute.get("/", async (_, response) => {
  const appointmentRepository = getRepository(User);
  const appointments = await appointmentRepository.find();
  return response.json(appointments);
});

usersRoute.post("/", async (request, response) => {
  try {
    const { name, email, password }: User = request.body;
    const user = await createAppointmentService.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.json({ error: err.message });
  }
});

export default usersRoute;
