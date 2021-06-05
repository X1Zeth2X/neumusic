import { Message, VoiceChannel } from "discord.js";
import { ExecuteFunction } from "../interfaces/command";

export const execute: ExecuteFunction = async (_client, message) => {
  const msg: Message = message;

  // Get the voice channel of the member.
  const voiceChannel: VoiceChannel = message.member?.voice.channel;

  if (!voiceChannel) {
    await msg.channel.send(
      "You need to be in a voice channel to let the bot leave."
    );

    return;
  }

  // Get the voice channel connection.
  const connection = await voiceChannel.join();

  connection.dispatcher.pause();
  await msg.channel.send(":pause_button: Music Paused.");
};

export const name: string = "pause";
