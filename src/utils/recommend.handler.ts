import { MessageActionRow, MessageButton } from "discord-buttons";
import { Message } from "discord.js";
import moment from "moment";
import NeumusicBot from "../client/bot";
import { PageTokens, VideoData } from "../client/data-api";

class RecommendUtil {
  client: NeumusicBot;
  msg: Message;

  constructor(client: NeumusicBot, message: Message) {
    this.msg = message;
    this.client = client;
  }

  getTimeDelta(): string {
    return moment().utc().subtract(30, "minutes").toISOString();
  }

  async sendVideosData(videos: Array<VideoData>) {
    for (const data of videos) {
      await this.msg.channel.send(
        this.client.embed(
          {
            title: data.videoTitle,
            thumbnail: {
              url: data.videoThumbnail,
            },
            url: data.videoUrl,
            description: data.videoDesc,
          },
          this.msg
        )
      );
    }
  }

  async buildButtonRow() {
    const pageTokens: PageTokens = await this.client.cache.get("pageTokens");

    const nextBtn = new MessageButton()
      .setLabel("Next")
      .setStyle(1)
      .setID("recommend_next");

    const prevBtn = new MessageButton()
      .setLabel("Previous")
      .setStyle(2)
      .setID("recommend_prev");

    const buttonRow = new MessageActionRow();

    if (pageTokens.prevPageToken !== undefined) buttonRow.addComponent(prevBtn);
    if (pageTokens.nextPageToken !== undefined) buttonRow.addComponent(nextBtn);

    return buttonRow;
  }

  async updatePageTokensCache(pageTokens: PageTokens) {
    await this.client.cache.set("pageTokens", pageTokens);
  }

  async getCachePageTokens(): Promise<PageTokens> {
    return await this.client.cache.get('pageTokens');
  }

  async requestBuilder(data: RequestData): Promise<string> {
    const req = (
      "search/?type=video&videoCategoryId=10&maxResults=5&order=date" +
      `&publishedAfter=${this.getTimeDelta()}` +
      `&regionCode=${data.regionCode ? data.regionCode : "US"}`
    );

    if (data.pageOption) {
      const pageTokens = await this.getCachePageTokens();
      if (pageTokens === undefined) return req;

      let pageToken;

      switch (data.pageOption.toLowerCase()) {
        case 'next':
          pageToken = pageTokens.nextPageToken;
          break;
        case 'prev':
          pageToken = pageTokens.nextPageToken;
          break;
      }

      return req + `&pageToken=${pageToken}`;
    }

    return req;
  }
}

type RequestData = {
  regionCode?: string;
  pageOption?: string;
}

export default RecommendUtil;
