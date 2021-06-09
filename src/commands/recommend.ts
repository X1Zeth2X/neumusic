import moment from "moment";
import { ExecuteFunction } from "../interfaces/command";
import YTClient, { YTResponse, PageTokens } from "../client/data-api";
import RecommendUtil from "../utils/recommend.handler";

export const name: string = "recommend";

export const execute: ExecuteFunction = async (client, message, ...args) => {
  // Load Client and Util
  const ytClient = new YTClient(process.env.API_KEY);
  const RecUtil = new RecommendUtil(client, message);

  // Set Request Params
  const timeDelta = RecUtil.getTimeDelta();
  const regionCode: string = args[0][0];
  const nextPrev: string = args[0][1];

  await message.channel.send(":mag_right: **Searching...**");

  const reqString = await RecUtil.requestBuilder({ regionCode, pageOption: nextPrev });
  const response = await ytClient.makeRequest(reqString);

  // @TODO: Improve error handling.
  if (response.status !== 200) {
    console.log(response.statusText);
    message.channel.send(`:x: **An error occured: ${response.statusText}!**`);
    return;
  }

  const jsonData: YTResponse = await response.json();

  await RecUtil.updatePageTokensCache({
    nextPageToken: jsonData.nextPageToken,
    prevPageToken: jsonData.prevPageToken,
  });

  const videosData = await ytClient.loadItems(jsonData.items);
  await RecUtil.sendVideosData(videosData);

  // Send a response message.
  const msg = `:card_box: **${
    jsonData.pageInfo.totalResults
  }** uploads since :date: ${moment
    .utc(timeDelta)
    .format("MMMM Do YYYY, h:mmA")} **UTC**`;

  message.channel.send(msg);
};
