import { KyselyDatabase } from "@/lib/database";

export async function GET(request: Request) {
  const database = KyselyDatabase.getInstance();

  try {
    const { content } = await database.getDeveloperBio();
    return Response.json({ result: content }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return Response.json({ error }, { status: 500 });
  }
}
