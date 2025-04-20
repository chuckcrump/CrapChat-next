import type { Context } from "hono";
import { db } from "../db/db";
import { conversations, chats } from "../db/schema";
import { eq } from "drizzle-orm";

interface Convo {
  id: string;
  title: string;
  messages: Message[];
}

type Message = {
  uuid: string;
  role: string;
  content: string;
  user: boolean;
  modelName: string;
};

export function sayHi(c: Context) {
  return c.text("Hello");
}

export async function listConvos(c: Context) {
  const convos = await db.select().from(conversations);
  const empty = convos.length ? false : true;
  return c.json({ convos: convos, empty: empty });
}

export async function getMessages(c: Context) {
  const { id } = c.req.param();

  const messages = await db.select().from(chats).where(eq(chats.convoId, id));

  return c.json(messages);
}

export async function createChat(c: Context) {
  let input = (await c.req.json()) as Convo;

  try {
    const res = await db
      .insert(conversations)
      .values({ title: input.title })
      .returning();

    const conversationId = res[0].id;

    for (const message of input.messages) {
      await db.insert(chats).values({
        convoId: conversationId,
        role: message.role,
        content: message.content,
        user: message.user,
        modelName: message.modelName,
      });
    }

    return c.json(
      { message: "Conversation created successfully", uuid: conversationId },
      200
    );
  } catch (error) {
    console.log(error);
    return c.json(
      {
        message: "Uh oh, there was an error creating your new conversation",
        error: error,
      },
      500
    );
  }
}

export async function update(c: Context) {
  const body = await c.req.json();
  if (
    !body ||
    typeof body !== "object" ||
    !body.title ||
    !Array.isArray(body.messages)
  ) {
    console.log("bad request body", body);
    return c.json({ success: false, error: "Invalid body" }, 400);
  }

  const { id } = await c.req.param();
  const { title, messages } = await c.req.json();

  try {
    await db
      .update(conversations)
      .set({ title })
      .where(eq(conversations.id, id));

    await db.delete(chats).where(eq(chats.convoId, id));

    for (const message of messages) {
      await db.insert(chats).values({
        //id: message.id,
        convoId: id,
        role: message.role,
        content: message.content,
        user: message.user,
        modelName: message.modelName,
      });
    }
    console.log("big success");
    return c.json({ success: true, error: null });
  } catch (error) {
    console.log("big error ", error);
    return c.json({ success: false, error: error });
  }
}

export async function removeConvo(c: Context) {
  const { id } = await c.req.param();

  try {
    await db.delete(conversations).where(eq(conversations.id, id));
    return c.json({ message: "Deleted conversation " + id });
  } catch (error) {
    return c.json({
      message: "failed to remove conversation " + id,
      error: error,
    });
  }
}
