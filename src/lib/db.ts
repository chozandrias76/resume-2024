import { db } from '@vercel/postgres';

export async function connectToDatabase() {
  try {
    const client = await db.connect();

    return client;

  } catch (error) {
    console.error(error);
    throw new Error("DB connection failed\n")
  }

}
