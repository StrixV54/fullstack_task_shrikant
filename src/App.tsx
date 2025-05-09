import { useEffect, useMemo } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import axios from "axios";
import useSWR from "swr";
import type { ITask } from "./lib/type";

// Import components
import Layout from "./components/Layout";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import Card from "./components/Card";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const socket: Socket = io(SOCKET_URL);

const fetcher = async <T,>(url: string): Promise<T> => {
    const response = await axios.get(url);
    return response.data as T;
};

function App() {
    const { data, isLoading, error, mutate } = useSWR(`${BACKEND_URL}/api/fetchAllTasks`, (url) => fetcher<ITask[]>(url), {
        revalidateOnFocus: false,
    });

    const tasks = useMemo(() => (data && data.length > 0 ? data : []), [data]);

    useEffect(() => {
        function onConnect() {
            console.log("Connected to server", socket.id);
        }
        function onDisconnect() {
            console.log("Disconnected from server");
        }
        function onTaskAdded() {
            mutate();
            toast.info(`Task added Successfully!`, { id: "addTask" });
        }
        function onError(error: string) {
            console.error("Error:", error);
            toast.error(`Error: ${error}`);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("task:created", onTaskAdded);
        socket.on("error", onError);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("task:created", onTaskAdded);
            socket.off("error", onError);
        };
    }, [mutate]);

    const handleAddTask = (text: string) => {
        socket.emit("task:add", text);
        toast.loading("Adding task...", { id: "addTask" });
    };

    return (
        <Layout>
            <Card>
                <Card.Header />
                <NoteForm onAddNote={handleAddTask} />
                <NotesList notes={tasks} isLoading={isLoading} error={error} />
            </Card>
        </Layout>
    );
}

export default App;
