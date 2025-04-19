import Database from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { chats, conversations } from "./schema";

const sqlite = new Database("chats.db");

export const db = drizzle(sqlite, { schema: { chats, conversations } });
