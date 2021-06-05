import { VoiceState } from "discord.js";
import { ExecuteFunction } from "../../interfaces/event";

export const execute: ExecuteFunction = async (
  client,
  oldState: VoiceState,
  newState: VoiceState
) => {
  client.logger.log("Do something when voice channel updates.");
};

export const name: string = "voiceStateUpdate";
