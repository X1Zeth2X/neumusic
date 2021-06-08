const baseUrl: string = 'https://youtube.googleapis.com/youtube/v3/';

class YTClient {
  url: string;
  key?: string;

  constructor(apiKey?: string) {
    this.url = baseUrl;
    this.key = apiKey;
  }

  async makeRequest(params: string): Promise<Response> {
    // @TODO: Error Handling
    return (await fetch(`${this.url}${params}?key=${this.key}`));
  }
}

export default YTClient;