import dotenv from "dotenv";
import mongoose from "mongoose";
import { createClient } from "redis";
dotenv.config();

export const REDIS_KEY = 'FULLSTACK_TASK_SHRIKANT';

try {
    dotenv.config();
} catch (error) {
    console.error("Error loading environment variables:", error);
    process.exit(1);
}

const client = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
});

try {
    client.on('error', (err: Error) => console.log('Redis Client Error', err));

    client.connect()
        .then(() => console.log("Successfully connected to Redis!!"))
        .catch((err: Error) => console.log("Error connecting to Redis!!\n", err));;

} catch (error) {
    console.error("Error creating Redis client:", error);
}

mongoose.connect(process.env.NODE_ENV_MONGO_URL!)
    .then(() => console.log("Successfully connected to MongoDB!!"))
    .catch((err: Error) => console.log("Error connecting to MongoDB!!\n", err));

export { client, mongoose };
