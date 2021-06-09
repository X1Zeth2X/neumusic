import { ExecuteFunction } from "../interfaces/command";

export const name: string = "ping";

export const execute: ExecuteFunction = async (client, message) => {
  await message.channel.send(client.embed({ description: "PONG!" }, message));
};
