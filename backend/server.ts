import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";
import taskRoutes from "./routes/task";
import socketConnection from "./socket";

const app = express();
const PORT = process.env.PORT || 4000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "https://kaznote-wss.vercel.app"]
    }
});

app.use(cors({
    origin: ["http://localhost:5173", "https://kaznote-wss.vercel.app"],
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.send(`Server is running.`);
});

app.use("/api", taskRoutes);

io.on('connection', socketConnection);

server.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}.`);
});
