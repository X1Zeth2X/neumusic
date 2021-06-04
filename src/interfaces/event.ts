import NeumusicBot from "../client/bot";

interface ExecuteFunction {
  (client: NeumusicBot, ...args: Array<any>): Promise<void>;
};

interface Event {
  name: string;
  execute: ExecuteFunction;
};

export { Event, ExecuteFunction };
export default Event;