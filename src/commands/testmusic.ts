import { Message } from "discord.js";
import { ExecuteFunction } from "../interfaces/command";

export const execute: ExecuteFunction = async (_client, message) => {
  const msg: Message = message;
  // Get the voice channel of the member.
  const voiceChannel = msg.member?.voice.channel;

  if (!voiceChannel)
    return message.channel.send("You need to be in a voice channel");

  await voiceChannel.join();
};

export const name: string = "testMusic";
