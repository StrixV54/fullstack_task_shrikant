import { Request, Response } from "express";
import Task from "../model/Task";
import { client, REDIS_KEY } from "../config/index";
import { ITask } from "../utils/types";

class TaskController {
    async fetchAllTasks(req: Request, res: Response): Promise<void> {
        try {
            let redisTasks: ITask[] = [];
            const redisTasksString = await client.get(REDIS_KEY);
            if (redisTasksString) {
                redisTasks = JSON.parse(redisTasksString);
                res.status(200).json(redisTasks);
                return;
            }
            const allTasks: ITask[] = await Task.find({});
            res.status(200).json(allTasks);
        } catch (error) {
            console.error("Error fetching all tasks:", error);
            res.status(500).send("Error retrieving tasks list.");
        }
    }
}

export default new TaskController();
