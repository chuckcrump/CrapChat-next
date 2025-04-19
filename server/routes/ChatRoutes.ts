import { Hono } from "hono";
import * as chatControllers from "../controllers/ChatsController";

const chatRoutes = new Hono();

chatRoutes.get("/hello", chatControllers.sayHi);
chatRoutes.post("/create", chatControllers.createChat);
chatRoutes.get("/list", chatControllers.listConvos);
chatRoutes.get("/list-message/:id", chatControllers.getMessages);
chatRoutes.put("/update/:id", chatControllers.update);

export default chatRoutes;
