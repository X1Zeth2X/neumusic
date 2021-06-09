import "dotenv/config";
import NeumusicBot from "./client/bot";
import express from "express";

const server = express();
const port = process.env.PORT || "3000";

server.all("/", (_req, res) => {
  res.send("We're live :)");
});

server.listen(port, () => {
  // Instantiate the bot and run it
  new NeumusicBot().run(process.env.TOKEN);
  console.log("Server ready.");
});
