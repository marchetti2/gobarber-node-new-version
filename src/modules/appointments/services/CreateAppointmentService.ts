import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      appointmentDate,
    );
    if (findAppointmentInSameDate) {
      console.log(findAppointmentInSameDate, appointmentDate);
      throw new AppError('This appointment is already booked');
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
