import { ExecuteFunction } from "../interfaces/command";
import MusicUtil from "../utils/voice";

export const name: string = "resume";

export const execute: ExecuteFunction = async (_client, message) => {
  const MUtil = new MusicUtil(message, name);
  const response = await MUtil.resume();

  message.channel.send(response);
};
