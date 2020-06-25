import { getRepository } from "typeorm";
import { hash } from "bcrypt";

import User from "../models/Users";

interface request {
  name: string;
  email: string;
  password: string;
}

class CreateAppointmentService {
  public async execute({ name, email, password }: request): Promise<User> {
    const appointmentRepository = getRepository(User);

    const hashedPassword = await hash(password, 8);
    const appointment = appointmentRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await appointmentRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;
