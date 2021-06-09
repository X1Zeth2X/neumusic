import { ExecuteFunction } from "../interfaces/command";

export const name: string = "help";

export const execute: ExecuteFunction = async (client, message) => {
  const avatarUrl = client.user?.avatarURL({ format: "png", dynamic: true });

  await message.channel.send(
    client.embed(
      {
        title: "Help",
        url: "https://github.com/X1Zeth2X/neumusic",
        thumbnail: {
          url: avatarUrl ? avatarUrl : "",
        },
        description: "Commands can be found on the GitHub, click on the title.",
      },
      message
    )
  );
};
