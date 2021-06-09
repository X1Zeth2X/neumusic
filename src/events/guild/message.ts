import { ExecuteFunction } from "../../interfaces/event";
import { Message } from "discord.js";
import Command from "../../interfaces/command";

export const name: string = "message";

export const execute: ExecuteFunction = async (client, message: Message) => {
  if (
    message.author.bot ||
    !message.guild ||
    !message.content.toLowerCase().startsWith("nm!")
  )
    return;

  const args: Array<string> = message.content
    .slice("nm!".length)
    .trim()
    .split(/ +/g);

  // @ts-ignore
  const argCommand: string = args.shift();
  // @ts-ignore
  const command: Command = client.commands.get(argCommand);

  if (!command) return;

  command.execute(client, message, args).catch((reason: any) =>
    message.channel.send(
      client.embed(
        {
          description: `An error occured during execution: ${reason}`,
        },
        message
      )
    )
  );
};
