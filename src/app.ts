import "dotenv/config";
import NeumusicBot from "./client/bot";


const port = process.env.PORT;
new NeumusicBot().run(process.env.TOKEN);

console.log(`Useless Port :${port}`);