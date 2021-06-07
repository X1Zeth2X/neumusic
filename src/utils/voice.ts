import { Message, VoiceChannel, VoiceConnection } from "discord.js";
import ytdl from "ytdl-core";

class NotInChannel extends Error {
  constructor(m: string) {
    super(m);
    this.name = "NotInChannel";
  }

  errorMsg(): string {
    return `You need to be in a voice channel to ${this.message} music.`;
  }
}

class VoiceUtil {
  public voiceChannel: VoiceChannel | null | undefined;
  private action: string;

  constructor(message: Message, action: string) {
    this.voiceChannel = message.member?.voice.channel;
    this.action = action;
  }

  errorHandler(e: Error) {
    // Return NotInChannel error message.
    if (e instanceof NotInChannel) return e.errorMsg();
    console.log(`An error has occured: ${e}`);
  }

  async getConnection(): Promise<VoiceConnection | undefined> {
    if (this.voiceChannel) {
      return await this.voiceChannel?.join();
    }

    throw new NotInChannel(this.action);
  }

  // Play
  async play(): Promise<string | undefined> {
    try {
      (await this.getConnection())?.play(
        ytdl("https://youtu.be/qQP2r-AgvZY", { filter: "audioonly" })
      );
      return ":musical_note: Playing music.";

    } catch (err) {
      this.errorHandler(err);
    }
  }

  // Pause
  async pause(): Promise<string | undefined> {
    try {
      (await this.getConnection())?.dispatcher.pause();
      return ":pause_button: Paused the music.";

    } catch (err) {
      this.errorHandler(err);
    }
  }

  // Resume
  async resume(): Promise<string | undefined> {
    try {
      (await this.getConnection())?.dispatcher.resume();
      return ":play_pause: Resumed the music.";

    } catch (err) {
      this.errorHandler(err);
    }
  }

  // Stop
  async stop(): Promise<string | undefined> {
    try {
      (await this.getConnection())?.dispatcher.destroy();
      return ":stop_sign: Stopped the music.";

    } catch (err) {
      this.errorHandler(err);
    }
  }

  // Leave voice channel.
  async leave() {
    try {
      (await this.getConnection())?.disconnect();
      return ":musical_note: Leaving the voice channel...";

    } catch (err) {
      this.errorHandler(err);
    }

  }
}

export { NotInChannel, VoiceUtil };
export default VoiceUtil;
