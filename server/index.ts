import { Hono } from "hono";
import { cors } from "hono/cors";
import chatRoutes from "./routes/ChatRoutes";
import type { Context } from "hono";

const PORT = 8080;
const app = new Hono();

app.use("*", cors());

app.route("/chats", chatRoutes);
app.get("/hello", async (c: Context) => {
  return c.text("Hello");
});

console.log("Running on " + PORT);
Bun.serve({ fetch: app.fetch, port: PORT });
