import { createKysely } from "@vercel/postgres-kysely";

interface ImageTable {
  image_name: string;
  image_key: string;
  created_at: string;
}

interface Database {
  image_store: ImageTable;
}

export async function connectToDatabase() {
  try {
    const db = createKysely<Database>();

    return db;
  } catch (error) {
    console.error(error);
    throw new Error("DB connection failed\n");
  }
}
