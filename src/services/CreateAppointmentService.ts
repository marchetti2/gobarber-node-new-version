import Appointment from "../models/Appointments";
import AppointmentRepository from "../repositories/AppointmentsRepository";

interface request {
  name: string;
  email: string;
}

class CreateAppointmentService {
  private appointmentRepository: AppointmentRepository;
  constructor(appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute({ name, email }: request): Appointment {
    const appointment = this.appointmentRepository.create({ name, email });
    return appointment;
  }
}

export default CreateAppointmentService;
