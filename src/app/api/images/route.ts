import { KyselyDatabase } from "@/lib/database";
import { Database } from "@/lib/database.interface";
import { createKysely } from "@vercel/postgres-kysely";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url, `http://localhost`);
  const queryParams = url.searchParams;
  const imageName = queryParams.get("image_name");

  const database = new KyselyDatabase(createKysely<Database>());

  try {
    if (imageName === null) {
      throw new Error("Can not query on this route without image_name");
    }
    const image = await database.getImageKeyByName(imageName);
    return NextResponse.json({ result: image.image_key }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
