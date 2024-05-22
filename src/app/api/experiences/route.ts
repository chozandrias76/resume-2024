import { KyselyDatabase } from "@/lib/database";
import { Database } from "@/lib/database.interface";
import { createKysely } from "@vercel/postgres-kysely";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url, `http://localhost`);
  const queryParams = url.searchParams;
  const positions = queryParams.get("positions");

  const database = new KyselyDatabase(createKysely<Database>());

  try {
    if (positions === null) {
      throw new Error("Can not query on this route without positions count");
    }
    const experiences = await database.getExperiences(Number.parseInt(positions));
    return NextResponse.json({ result: experiences }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
