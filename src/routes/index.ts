import { Router } from "express";

import usersRoute from "./users.routes";
import sessionRoute from "./sessions.routes";
import appointmentRoute from "./appointment.routes";

const routes = Router();
routes.use("/users", usersRoute);
routes.use("/session", sessionRoute);
routes.use("/appointments", appointmentRoute);

export default routes;
