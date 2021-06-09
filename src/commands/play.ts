import { ExecuteFunction } from "../interfaces/command";
import MusicUtil from "../utils/voice.handler";

export const name: string = "play";

export const execute: ExecuteFunction = async (_client, message, ...args) => {
  const MUtil = new MusicUtil(message, name);
  const url: string = args[0][0];
  const response = await MUtil.play(url);

  if (response) message.channel.send(response);
};
