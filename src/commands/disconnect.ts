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

  voiceChannel.leave();
  await msg.channel.send("🎵 Leaving the voice channel.");
};

export const name: string = "leave";
