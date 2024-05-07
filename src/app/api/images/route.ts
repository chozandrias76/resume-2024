import { connectToDatabase } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url, `http://localhost`);
  const queryParams = url.searchParams;

  // Accessing the query parameters
  const imageName = queryParams.get('image_name') || "";
  const client = await connectToDatabase();
  try {
    const { rows } = await client.query(`SELECT * FROM image_store WHERE image_name = '${imageName}'`);

    return NextResponse.json({result: rows}, {status: 200})
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return NextResponse.json({error}, {status: 500})

  } finally {
    // await client();
  }
}
