// Don't check the file
// @ts-nocheck
import { ExecuteFunction } from "../../interfaces/event";

export const name: string = "clickButton";

export const execute: ExecuteFunction = async (client) => {
  console.log(await client.cache.get("pageTokens"));
  client.reply.send(
    ":information_source: **This hasn't been implemented yet.**"
  );
};
