import { Router } from "express";

import appointmentRoute from "./appointment.routes";
import usersRoute from "./users.routes";
import sessionRoute from "./sessions.routes";

const routes = Router();
routes.use("/appointments", appointmentRoute);
routes.use("/users", usersRoute);
routes.use("/session", sessionRoute);

export default routes;
