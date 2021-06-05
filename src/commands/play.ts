import { Message, VoiceChannel } from "discord.js";
import { ExecuteFunction } from "../interfaces/command";
import ytdl from "ytdl-core";

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

  // Play sample music
  connection.play(
    ytdl("https://youtu.be/qQP2r-AgvZY", { filter: "audioonly" })
  );

  await msg.channel.send(":musical_note: Playing Music.");
};

export const name: string = "play";
