import { getCustomRepository } from "typeorm";

import Appointment from "../models/Appointments";
import AppointmentRepository from "../repositories/AppointmentsRepository";
import { startOfHour } from "date-fns";

interface request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      appointmentDate
    );
    if (findAppointmentInSameDate) {
      console.log(findAppointmentInSameDate, appointmentDate);
      throw Error("This appointment is already booked");
    }

    const appointment = appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });
    await appointmentRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;
