import { Router } from "express";

import appointmentRoute from "./appointment.routes";
import usersRoute from "./users.routes";

const routes = Router();
routes.use("/appointments", appointmentRoute);
routes.use("/users", usersRoute);

export default routes;
