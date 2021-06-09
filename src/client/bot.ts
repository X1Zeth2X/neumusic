import {
  Client,
  Intents,
  Collection,
  MessageEmbed,
  MessageEmbedOptions,
  Message,
} from "discord.js";

import { promisify } from "util";
import consola, { Consola } from "consola";
import glob from "glob";
import Keyv from "keyv";

// Relative Imports
import Command from "../interfaces/command";
import Event from "../interfaces/event";

const globPromise: Function = promisify(glob);

class NeumusicBot extends Client {
  cache: Keyv;

  constructor() {
    /* https://discord.js.org/#/docs/main/stable/typedef/ClientOptions */
    super({
      ws: {
        intents: Intents.ALL,
      },
      messageCacheLifetime: 150, // How long message is cached (seconds).
      messageCacheMaxSize: 100, // Max message cache per channel.
      messageSweepInterval: 60,
      messageEditHistoryMaxSize: 0,
    });

    // Create a new cache with Keyv (in-memory storage);
    this.cache = new Keyv();
  }

  // Console Logger: https://github.com/unjs/consola
  logger: Consola = consola;
  // Instantiate a new Collection of Commands
  commands: Collection<string, Command> = new Collection();
  // Instantiate a new Collection of Events
  events: Collection<string, Event> = new Collection();

  // Run the Bot.
  async run(token?: string) {
    // Bot login token.
    this.login(token);

    // Command files
    const commandFiles: Array<string> = await globPromise(
      `${__dirname}/../commands/**/*{.ts,.js}`
    );
    commandFiles.map(async (value: string) => {
      const file: Command = await import(value);
      this.commands.set(file.name, file);
    });

    // Event files
    const eventFiles: Array<string> = await globPromise(
      `${__dirname}/../events/**/*{.ts,.js}`
    );
    eventFiles.map(async (value: string) => {
      const file: Event = await import(value);

      this.events.set(file.name, file);
      this.on(file.name, file.execute.bind(null, this));
    });
  }

  // Embeds
  embed(options: MessageEmbedOptions, message: Message): MessageEmbed {
    return new MessageEmbed({ ...options, color: "DARK_RED" }).setFooter(
      `Requested by ${message.author.tag} | ${this.user?.username} - Beta`,
      message.author.displayAvatarURL({
        format: "png",
        dynamic: true,
      })
    );
  }
}

export { NeumusicBot };
export default NeumusicBot;
