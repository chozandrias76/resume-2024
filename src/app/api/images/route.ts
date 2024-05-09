import { connectToDatabase } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url, `http://localhost`);
  const queryParams = url.searchParams;

  // Accessing the query parameters
  const imageName = queryParams.get('image_name');
  const db = await connectToDatabase();
  try {
    if(imageName === null) {
      throw new Error("Can not query on this route without image_name")
    }
    const rows = await db.selectFrom("image_store").select("image_key").where("image_name", "=", imageName).execute();
    console.error(rows)
    return NextResponse.json({result: rows}, {status: 200})
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return NextResponse.json({error}, {status: 500})

  } finally {
    await db.destroy()
  }
}
