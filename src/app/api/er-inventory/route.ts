import { KyselyDatabase } from "@/lib/database";
import type { Database } from "@/lib/database.interface";
import { createKysely } from "@vercel/postgres-kysely";

export async function GET(request: Request) {
  const requestURL = new URL(request.url);
  const buildID = requestURL.searchParams.get("b");

  try {
    if (!buildID) {
      throw new Error(
        "This endpoint is not functional without an build ID, 'b'. This can be found in your build URL, following 'b='"
      );
    }
    const database = new KyselyDatabase(createKysely<Database>());

    const inventory = await database.getInventoryById(buildID);

    return Response.json(inventory.data, { status: 200 });
  } catch (error: any) {
    console.error("Failed to fetch data:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
