import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const createAppointmentService = container.resolve(CreateUserService);
      const { name, email, password } = request.body;
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
  }
}
