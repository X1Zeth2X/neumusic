import { ExecuteFunction } from "../../interfaces/event";

export const name: string = "ready";

export const execute: ExecuteFunction = async (client) => {
  client.logger.success(`${client.user?.tag} is now online!`);
};
