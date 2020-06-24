import Appointment from "../models/Appointments";
import AppointmentRepository from "../repositories/AppointmentsRepository";

interface request {
  id: string;
  name: string;
  email: string;
}

class UpdateAppointmentService {
  private appointmentRepository: AppointmentRepository;
  constructor(appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute({ id, name, email }: request): Appointment {
    const find = this.appointmentRepository.changeById({ id, name, email });

    if (find) {
      return find;
    }
    throw Error("user not found");
  }
}

export default UpdateAppointmentService;
