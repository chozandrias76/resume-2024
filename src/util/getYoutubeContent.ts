import { google } from "googleapis";
import { youtube_v3 } from "googleapis/build/src/apis/youtube";

const {
  YOUTUBE_CHANNEL_ID: channelId,
  YOUTUBE_CLIENT_ID: clientId,
  YOUTUBE_CLIENT_SECRET: clientSecret,
  YOUTUBE_REFRESH_TOKEN: refreshToken,
} = process.env;

const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
oauth2Client.setCredentials({ refresh_token: refreshToken });

const youtube = google.youtube({ version: "v3", auth: oauth2Client });

export interface IThumbnail {
  player: string | null | undefined;
  description: string | null | undefined;
  title: string | null | undefined;
  thumbnailURL: string | null | undefined;
}

export async function getYoutubeContent({
  validPageSize,
  pageToken,
}: {
  validPageSize: number;
  pageToken?: string | null;
}): Promise<{ thumbnails: IThumbnail[]; search: any } | undefined> {
  const searchParams: youtube_v3.Params$Resource$Search$List = {
    type: ["video"],
    part: ["snippet"],
    channelId,
    maxResults: validPageSize,
    order: "date",
    ...(pageToken && { pageToken })
  };
  const search = await youtube.search.list(searchParams);
  const videoIDs = search.data.items?.map((item) => item.id?.videoId);

  const videoSearchParams: youtube_v3.Params$Resource$Videos$List = {
    maxResults: validPageSize,
    id: videoIDs as string[],
    part: ["snippet", "contentDetails", "player"],
    uploadType: "video",
  };

  const videos = await youtube.videos.list(videoSearchParams);

  const thumbnails =
    videos.data?.items
      ?.filter((item) => {
        for (const tag of item?.snippet?.tags || []) {
          return /elden ring/i.test(tag);
        }
      })
      .map(
        (item) =>
          ({
            player: item?.player,
            description: item?.snippet?.description,
            title: item?.snippet?.title,
            thumbnailURL: item?.snippet?.thumbnails?.high?.url,
          } as IThumbnail)
      ) || [];
  return { search, thumbnails };
}
