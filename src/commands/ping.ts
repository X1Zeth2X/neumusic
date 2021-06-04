import { Message } from "discord.js";
import { ExecuteFunction } from "../interfaces/command";

export const execute: ExecuteFunction = async (client, message) => {
  const msg: Message = await message.channel.send(
    client.embed({ description: "PONG!" }, message)
  );
};

export const name: string = "ping";
