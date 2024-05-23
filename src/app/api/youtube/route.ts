import { google } from "googleapis";
import { youtube_v3 } from "googleapis/build/src/apis/youtube";

const {
  YOUTUBE_CHANNEL_ID: channelId,
  YOUTUBE_CLIENT_ID: clientId,
  YOUTUBE_CLIENT_SECRET: clientSecret,
  YOUTUBE_REFRESH_TOKEN: refreshToken,
} = process.env;

// I found a post on StackOverflow that suggested 10. Seems reasonable
const resultMax = 10;

const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
oauth2Client.setCredentials({ refresh_token: refreshToken });

const youtube = google.youtube({ version: "v3", auth: oauth2Client });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // pageToken will be returned from the initial and subsequent responses where pages are present
  const pageToken = searchParams.get("pageToken") || undefined
  const pageSize = parseInt(searchParams.get("pageSize") || resultMax.toString(), 10);
  const validPageSize = isNaN(pageSize) || pageSize < 1 ? resultMax : pageSize;
  try {
    const searchParams: youtube_v3.Params$Resource$Search$List = {
      type: ["video"],
      part: ["snippet"],
      channelId,
      maxResults: validPageSize,
      order: "date",
      pageToken
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

    const thumbnails = videos.data?.items
      ?.filter((item) => {
        for (const tag of item?.snippet?.tags || []) {
          return /elden ring/i.test(tag);
        }
      })
      .map((item) => ({
        player: item?.player,
        description: item?.snippet?.description,
        title: item?.snippet?.title,
        thumbnailURL: item?.snippet?.thumbnails?.high?.url,
      }));

    return new Response(JSON.stringify({ nextPageToken: search.data.nextPageToken, prevPageToken: search.data.prevPageToken , result: thumbnails }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Error getting videos", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
