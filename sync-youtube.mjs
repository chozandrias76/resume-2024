import { Kysely, PostgresDialect } from "kysely";
import { config } from "dotenv";
import { createPool } from "@vercel/postgres";

config({ path: ".env.development.local" });
config({ path: ".env.local" });

import { google } from "googleapis";

const {
  YOUTUBE_CHANNEL_ID: channelId,
  YOUTUBE_CLIENT_ID: clientId,
  YOUTUBE_CLIENT_SECRET: clientSecret,
  YOUTUBE_REFRESH_TOKEN: refreshToken,
} = process.env;

const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
oauth2Client.setCredentials({ refresh_token: refreshToken });

const youtube = google.youtube({ version: "v3", auth: oauth2Client });


const getVideosData = async (videos) => {
  return videos.data?.items?.map((item) => ({
    embed_html: item?.player.embedHtml,
    description: item?.snippet?.description,
    title: item?.snippet?.title,
    thumbnail_url: item?.snippet?.thumbnails?.high?.url,
    id: item?.id,
  }));
};

async function fetchYoutubeContent({ validPageSize, pageToken }) {
  const searchParams = {
    type: ["video"],
    part: ["snippet"],
    channelId,
    maxResults: validPageSize,
    order: "date",
    ...(pageToken && { pageToken }),
  };
  const search = await youtube.search.list(searchParams);

  const videoIDs = search.data.items?.map((item) => item.id?.videoId);

  const videoSearchParams = {
    maxResults: validPageSize,
    id: videoIDs,
    part: ["snippet", "contentDetails", "player", "id"],
    uploadType: "video",
  };

  const videos = await youtube.videos.list(videoSearchParams);
  const thumbnails = await getVideosData(videos);
  return thumbnails;
}

const cacheYoutubeData = async () => {
  const pool = createPool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = new Kysely({
    dialect: new PostgresDialect({
      pool,
    }),
  });
  const thumbnails = await fetchYoutubeContent({ validPageSize: 1_000 });
  await db
    .insertInto("youtube_data")
    .values(thumbnails)
    .onConflict((oc) =>
      oc
        .column("id")
        .doUpdateSet((eb) => ({
          title: eb.ref('excluded.title'),
          description: eb.ref('excluded.description'),
          thumbnail_url: eb.ref('excluded.thumbnail_url'),
          embed_html: eb.ref('excluded.embed_html'),
        }))
    )
    .execute();
  await pool.end();
};

await cacheYoutubeData();
