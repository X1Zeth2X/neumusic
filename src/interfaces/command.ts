import NeumusicBot from '../client/bot';

interface ExecuteFunction {
  (client: NeumusicBot, ...args: Array<any>): Promise<void>;
};

interface Command {
  name: string;
  category: string;
  execute: ExecuteFunction;
};

export { Command, ExecuteFunction };
export default Command;