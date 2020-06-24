import Appointment from "../models/Appointments";

interface createAppointmentDTO {
  name: string;
  email: string;
}
interface changeAppointmentDTO {
  id: string;
  name: string;
  email: string;
}

class AppointmentRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public create({ name, email }: createAppointmentDTO): Appointment {
    const appointment = new Appointment(name, email);
    this.appointments.push(appointment);
    return appointment;
  }

  public changeById({
    id,
    name,
    email,
  }: changeAppointmentDTO): Appointment | null {
    const appointmentIndex = this.appointments.findIndex(
      (appoi) => appoi.id === id
    );
    if (appointmentIndex < 0) {
      return null;
    }
    this.appointments[appointmentIndex] = new Appointment(name, email);
    return this.appointments[appointmentIndex];
  }

  public delete(id: string) {
    const appointmentIndex = this.appointments.findIndex(
      (appoi) => appoi.id === id
    );
    if (appointmentIndex < 0) {
      return null;
    }

    this.appointments.splice(appointmentIndex, 1);

    return this.appointments;
  }
}

export default AppointmentRepository;
