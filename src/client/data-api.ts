import fetch from "node-fetch";

class YTClient {
  url: string;
  key?: string;

  constructor(apiKey?: string) {
    this.url = "https://youtube.googleapis.com/youtube/v3/";
    this.key = apiKey;
  }

  async makeRequest(params: string) {
    const url: string = `${this.url}${params}&key=${this.key}`;
    console.log(`Performed fetch request using: ${url}`);

    return await fetch(url);
  }
}

export default YTClient;
