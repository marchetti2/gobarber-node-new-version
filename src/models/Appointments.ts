import { uuid } from "uuidv4";

class Appointment {
  id: string;
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.id = uuid();
    this.name = name;
    this.email = email;
  }
}

export default Appointment;
