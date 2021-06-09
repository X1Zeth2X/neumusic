import { Message } from "discord.js";
import NeumusicBot from "../client/bot";

interface ExecuteFunction {
  (client: NeumusicBot, message: Message, ...args: Array<any>): Promise<void>;
}

interface Command {
  name: string;
  category: string;
  execute: ExecuteFunction;
}

export { Command, ExecuteFunction };
export default Command;
