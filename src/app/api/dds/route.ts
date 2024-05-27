import { readDDSToRGBABuffer } from "@/util/readDDSToRGBABuffer";

export async function GET(request: Request) {
  const requestURL = new URL(request.url);
  const relativePath = requestURL.searchParams.get("rel_path");

  try {
    if (!relativePath) {
      throw new Error(
        "This endpoint is not functional without an Relative Path, 'rel_path'."
      );
    }
    const content = readDDSToRGBABuffer(`./public/elden-ring/raw/${relativePath}`)?.toString('base64')
    return Response.json({data: content}, { status: 200 });
  } catch (error: any) {
    console.error("Failed to fetch data:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
