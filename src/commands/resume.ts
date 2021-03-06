import { ExecuteFunction } from "../interfaces/command";
import MusicUtil from "../utils/voice.handler";

export const name: string = "resume";

export const execute: ExecuteFunction = async (_client, message) => {
  const MUtil = new MusicUtil(message, name);
  const response = await MUtil.resume();

  if (response) message.channel.send(response);
};
