import { KyselyDatabase } from "@/lib/database";

export async function GET(request: Request) {
  const url = new URL(request.url, `http://localhost`);
  const queryParams = url.searchParams;
  const imageName = queryParams.get("image_name");

  const database = KyselyDatabase.getInstance();

  try {
    if (imageName === null) {
      throw new Error("Can not query on this route without image_name");
    }
    const image = await database.getImageKeyByName(imageName);
    return Response.json({ result: image.image_key }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return Response.json({ error }, { status: 500 });
  }
}
