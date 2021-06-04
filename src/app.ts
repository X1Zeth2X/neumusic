import 'dotenv/config';
import NeumusicBot from './client/bot';

new NeumusicBot().run(process.env.TOKEN);