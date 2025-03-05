import { Router } from "express";
import userController from "../controllers/user.controllers.js";
import calendarController from "../controllers/calendar.controllers.js";

const router = Router();

router.route("/location").post(userController);

router.route("/full-calendar").post(calendarController);

export default router;
