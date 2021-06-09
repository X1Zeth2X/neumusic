import fetch from "node-fetch";
import ytdl, { MoreVideoDetails, VideoDetails } from "ytdl-core";

class YTClient {
  url: string;
  key?: string;

  constructor(apiKey?: string) {
    this.url = "https://youtube.googleapis.com/youtube/v3/";
    this.key = apiKey;
  }

  async makeRequest(params: string) {
    const url: string = `${this.url}${params}&key=${this.key}`;
    return await fetch(url);
  }

  loadItems(items: Array<Item>): Promise<VideoData[]> {
    return new Promise<VideoData[]>(async (resolve, _reject) => {
      const videosData: Array<VideoData> = [];

      for (const video of items) {
        // Get the ID of the video
        const videoId: string = video.id.videoId;

        // Request video details w/ytdl
        const videoDetails: MoreVideoDetails = (
          await ytdl.getBasicInfo(videoId)
        ).videoDetails;

        const videoData: VideoData = {
          videoTitle: videoDetails.title,
          videoDesc: `${videoDetails.description?.substring(0, 100)}...`,
          videoThumbnail: videoDetails.thumbnails[2].url,
          videoUrl: videoDetails.video_url,
        };

        videosData.push(videoData);
      }

      resolve(videosData);
    });
  }
}

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

type VideoData = {
  videoTitle: string;
  videoDesc?: string;
  videoThumbnail: string;
  videoUrl: string;
};

export { YTResponse, YTClient };
export default YTClient;
