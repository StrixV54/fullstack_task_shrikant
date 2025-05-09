import { Socket } from "socket.io";
import { client, REDIS_KEY } from "../config";
import Task from "../model/Task";
import { ITask } from "../utils/types";
import shortUUID from "short-uuid";

const socketConnection = (socket: Socket) => {
    console.log('User connected: ', socket.id);

    socket.on('task:add', async (newTask: string) => {
        try {
            console.log("adding task: ", newTask);
            const tasksString = await client.get(REDIS_KEY);
            const tasks: ITask[] = tasksString ? JSON.parse(tasksString) : [];
            const mongoTasks = await Task.find({});
            tasks.push({ text: newTask, id: shortUUID.generate() });

            if (tasks.length > 50 || mongoTasks.length) {
                console.log('More than 50 tasks in cache, moving to MongoDB and flushing redis.');
                await Task.insertMany(tasks); // add new one in mongodb or all from redis
                await client.del(REDIS_KEY);
            } else {
                await client.set(REDIS_KEY, JSON.stringify(tasks)); // add new + all existing in redis
            }
            socket.emit('task:created', newTask);
        } catch (error) {
            console.error('Error processing add event:', error);
            socket.emit('error', 'Failed to add task');
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected: ', socket.id);
    });
};

export default socketConnection;
