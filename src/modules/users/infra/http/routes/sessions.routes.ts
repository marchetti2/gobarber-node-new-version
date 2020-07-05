import { Router } from 'express';

import SessionController from '@modules/users/infra/http/controllers/SessionController';

const sessionRoute = Router();
const sessionController = new SessionController();

sessionRoute.post('/', sessionController.create);

export default sessionRoute;
