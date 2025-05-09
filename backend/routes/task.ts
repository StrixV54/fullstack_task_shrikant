import { Router } from "express";
import taskController from "../controller/taskController";
const router: Router = Router();

router.get("/fetchAllTasks", taskController.fetchAllTasks);

export default router;
