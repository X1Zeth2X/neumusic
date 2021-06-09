import { ExecuteFunction } from "../interfaces/command";
import YTClient from "../client/data-api";
import ytdl, { MoreVideoDetails } from "ytdl-core";
import moment from "moment";
import { MessageActionRow, MessageButton } from "discord-buttons";

export const name: string = "recommend";

export const execute: ExecuteFunction = async (client, message, ...args) => {
  const ytClient = new YTClient(process.env.API_KEY);
  // Recommendation Options
  const options: Array<string> = args[0];
  // const regionCode = options[0] ? options[0] : 'US';

  const timeDelta = moment().utc().subtract(20, "minutes").toISOString();

  const response = await ytClient.makeRequest(
    "search/?type=video" +
      "&videoCategoryId=10" +
      "&maxResults=5" +
      "&order=date" +
      // `&regionCode=${regionCode.toUpperCase()}` +
      `&publishedAfter=${timeDelta}`
  );

  const jsonData: YTResponse = await response.json();

  // Store Response Page Info in Cache
  const pageTokens = {
    nextPageToken: jsonData.nextPageToken,
    prevPageToken: jsonData.prevPageToken,
  };

  await client.cache.set("pageTokens", pageTokens);

  jsonData.items.forEach(async (video) => {
    const id: string = video.id.videoId;

    // Get the video details
    const details: MoreVideoDetails = (await ytdl.getInfo(id)).videoDetails;
    // Truncated description
    const desc: string = `${details.description?.substring(0, 100)}...`;

    message.channel.send(
      client.embed(
        {
          title: details.title,
          thumbnail: {
            url: details.thumbnails[2].url,
          },
          url: details.video_url,
          description: desc,
        },
        message
      )
    );
  });

  const pageInfo = jsonData.pageInfo;
  const msg = `:card_box: **${
    pageInfo.totalResults
  }** uploads since :date: ${moment
    .utc(timeDelta)
    .format("MMMM Do YYYY, h:mm:ssA")} **UTC**.`;

  message.channel.send(msg);
};

type YTResponse = {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: Array<Item>;
};

type PageInfo = {
  totalResults: number;
  resultsPerPage: number;
};

type Item = {
  kind: string;
  etag: string;
  id: Id;
};

type Id = {
  kind: string;
  videoId: string;
};
