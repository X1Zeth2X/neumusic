import { ExecuteFunction } from "../interfaces/command";
import MusicUtil from "../utils/voice";

export const name: string = "play";

export const execute: ExecuteFunction = async (_client, message) => {
  const MUtil = new MusicUtil(message, name);
  const response = await MUtil.play();

  message.channel.send(response);
};
