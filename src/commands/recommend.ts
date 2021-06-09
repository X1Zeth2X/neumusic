import { ExecuteFunction } from "../interfaces/command";
import YTClient, { YTResponse } from "../client/data-api";
import moment from "moment";

export const name: string = "recommend";

export const execute: ExecuteFunction = async (client, message) => {
  const ytClient = new YTClient(process.env.API_KEY);
  const timeDelta = moment().utc().subtract(20, "minutes").toISOString();

  const response = await ytClient.makeRequest(
    "search/?type=video" +
      "&videoCategoryId=10" +
      "&maxResults=5" +
      "&order=date" +
      `&publishedAfter=${timeDelta}`
  );

  const jsonData: YTResponse = await response.json();

  // Store Response Page Info in Cache
  const pageTokens = {
    nextPageToken: jsonData.nextPageToken,
    prevPageToken: jsonData.prevPageToken,
  };

  await client.cache.set("pageTokens", pageTokens);

  const videosData = await ytClient.loadItems(jsonData.items);

  for (const videoData of videosData) {
    message.channel.send(
      client.embed(
        {
          title: videoData.videoTitle,
          thumbnail: {
            url: videoData.videoThumbnail
          },
          url: videoData.videoUrl,
          description: videoData.videoDesc,
        },

        message
      )
    );
  }

  const pageInfo = jsonData.pageInfo;
  const msg = `:card_box: **${
    pageInfo.totalResults
  }** uploads since :date: ${moment
    .utc(timeDelta)
    .format("MMMM Do YYYY, h:mm:ssA")} **UTC**.`;

  message.channel.send(msg);
};
