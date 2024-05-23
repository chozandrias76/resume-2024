import { KyselyDatabase } from "@/lib/database";
import { Database } from "@/lib/database.interface";
import { createKysely } from "@vercel/postgres-kysely";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const database = new KyselyDatabase(createKysely<Database>());

  try {
    const { content } = await database.getDeveloperBio();
    return NextResponse.json({ result: content }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
