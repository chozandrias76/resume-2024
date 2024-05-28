import { getYoutubeContent } from "@/util/getYoutubeContent";

// I found a post on StackOverflow that suggested 10. Seems reasonable
const resultMax = 10;

export async function GET(request: Request): Promise<Response> {
  if(!request.url && !URL.canParse(request.url)) return new Response(JSON.stringify({ error: "Unable to perform request without initiating URL" }), { status: 500 });
  const { searchParams } = new URL(request.url);
  // pageToken will be returned from the initial and subsequent responses where pages are present
  const pageToken = searchParams.get("pageToken");
  const pageSize = parseInt(
    searchParams.get("pageSize") || resultMax.toString(),
    10
  );
  const validPageSize = isNaN(pageSize) || pageSize < 1 ? resultMax : pageSize;
  
  try {
    const youtubeContent = await getYoutubeContent({
      validPageSize,
      pageToken,
    });

    if (!youtubeContent) {
      return new Response(JSON.stringify({ error: "No content found" }), {
        status: 404,
      });
    }

    const {
      thumbnails: result,
      search: {
        data: { nextPageToken, prevPageToken },
      },
    } = youtubeContent;

    return new Response(
      JSON.stringify({
        nextPageToken,
        prevPageToken,
        result,
      }),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error getting videos", error);
    let errorMessage = "";
    switch (error.response.status) {
      case 500:
        errorMessage = error.message;
      case 403:
        errorMessage = "Rate Limit for Youtube API exceeded";
      default:
        break;
    }
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: error.response.status,
    });
  }
}
