import { Message } from "discord.js";
import { ExecuteFunction } from "../interfaces/command";

export const execute: ExecuteFunction = async (client, message) => {
  const msg: Message = await message.channel.send(
    client.embed({ description: "PONG!" }, message)
  );

  client.logger.log(`Bot sent a message: ${msg}`);
};

export const name: string = "ping";
