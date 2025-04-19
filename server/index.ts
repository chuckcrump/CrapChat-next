import { Hono } from "hono";
import { cors } from "hono/cors";
import chatRoutes from "./routes/ChatRoutes";

const PORT = 8080;
const app = new Hono();

app.use("*", cors());

app.route("/chats", chatRoutes);

console.log("Running on " + PORT);
Bun.serve({ fetch: app.fetch, port: PORT });
