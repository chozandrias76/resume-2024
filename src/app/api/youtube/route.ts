import { KyselyDatabase } from "@/lib/database";

const resultMax = 10;

export async function GET(request: Request): Promise<Response> {
  if (!request.url && !URL.canParse(request.url))
    return new Response(
      JSON.stringify({
        error: "Unable to perform request without initiating URL",
      }),
      { status: 500 }
    );
  const { searchParams } = new URL(request.url);
  // pageToken will be returned from the initial and subsequent responses where pages are present
  const page = parseInt(searchParams.get("page") || "0", 10);
  const pageSize = parseInt(
    searchParams.get("pageSize") || resultMax.toString(),
    10
  );
  const validPageSize = isNaN(pageSize) || pageSize < 1 ? resultMax : pageSize;

  try {
    const youtubeContent = await KyselyDatabase.getInstance().getYoutubeData(
      page,
      validPageSize
    );

    if (!youtubeContent) {
      return new Response(JSON.stringify({ error: "No content found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ result: youtubeContent }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Error getting videos", error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
