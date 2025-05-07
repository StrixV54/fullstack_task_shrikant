import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import { Server, Socket } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.NODE_ENV_MONGO_URL!)
    .then(() => console.log("Successfully connected to MongoDB!!"))
    .catch(err => console.log("Error connecting to MongoDB!!\n", err));

// Routes
app.get("/", (req, res) => {
    res.send(`Server is running.`);
});

io.on('connection', (socket: Socket) => {
    console.log('a user connected', socket.id);
});

server.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}.`);
});
