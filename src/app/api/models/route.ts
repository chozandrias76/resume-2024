import { readStreamAsText } from "@/util/readStreamAsText";

export async function GET(request: Request, _response: Response) {
  let fromUrl = new URL(request.url);
  let fileType = fromUrl.searchParams.get("file_type") || "stl";
  try {
    const internalFetchRoute = `${fromUrl.protocol}//${fromUrl.host}/api/s3?bucket_name=swensonhcp-resume-website&object_key=bust01.${fileType}`;
    const fileResponse = await fetch(internalFetchRoute, {next: {revalidate: 0}});

    if (!fileResponse.ok) {
      throw new Error(
        `Failed to fetch file from S3\n\t${fileResponse.statusText}`
      );
    }
    const fileSize = fileResponse.headers.get("Content-Length");
    const fileURL = JSON.parse(
      await readStreamAsText(fileResponse.body)
    ).result;
    const s3Response = await fetch(fileURL);

    if (!s3Response.body) {
      throw new Error('Failed to fetch S3 file content');
    }

    return new Response(s3Response.body, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Length": fileSize || "",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
      },
    });
  } catch (err: any) {
    console.error(err);
    return new Response(err.toString(), {
      status: 500,
    });
  }
}