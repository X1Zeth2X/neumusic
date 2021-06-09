import discordButtons from "discord-buttons";
import "dotenv/config";
import NeumusicBot from "./client/bot";

const client = new NeumusicBot();

// Bind Discord Buttons and Run App.
discordButtons(client);
client.run(process.env.TOKEN);
