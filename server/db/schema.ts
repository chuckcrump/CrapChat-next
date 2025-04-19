import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

export const conversations = sqliteTable("conversations", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  title: text("title").notNull(),
});

export const chats = sqliteTable("messages", {
  id: text("uuid")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  convoId: text("convo_id").references(() => conversations.id, {
    onDelete: "cascade",
  }),
  role: text("role").notNull(),
  content: text("content"),
  user: integer("user", { mode: "boolean" }),
});
