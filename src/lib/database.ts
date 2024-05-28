import { Kysely } from "kysely";
import type { IDatabase, Database } from "./database.interface";
import type { ERApiData } from "./erApiData.interface";
import { createKysely } from "@vercel/postgres-kysely";

export class KyselyDatabase implements IDatabase {
  private readonly db: Kysely<Database>;
  private static instance: KyselyDatabase;

  constructor(db: Kysely<Database>) {
    this.db = db;
  }

  static getInstance(): KyselyDatabase {
    if (!this.instance) {
      this.instance = new KyselyDatabase(createKysely<Database>());
    }
  
    return this.instance;
  }

  async getImageKeyByName(
    name: string
  ): Promise<Pick<Database["image_store"], "image_key">> {
    return await this.db
      .selectFrom("image_store")
      .select("image_key")
      .where("image_name", "=", name)
      .executeTakeFirstOrThrow();
  }

  async getDeveloperBio(): Promise<Pick<Database["bio"], "content">> {
    return await this.db
      .selectFrom("bio")
      .select("content")
      .orderBy("created_at", "desc")
      .orderBy("id", "desc")
      .executeTakeFirstOrThrow();
  }

  async getExperiences(count: number): Promise<Database["experience"][]> {
    const experiences = await this.db
      .selectFrom("experience")
      .selectAll()
      .limit(count)
      .orderBy("end_date", "desc")
      .execute();

    if (experiences.length !== count) {
      console.warn(
        "getExperiences is returning a different number of records than requested"
      );
    }
    return experiences;
  }

  async getInventoryById(
    api_id: string
  ): Promise<{data: ERApiData}> {
    return await this.db
      .selectFrom("api_data")
      .select("data")
      .where((eb) => eb("api_id", "=", api_id))
      .executeTakeFirstOrThrow();
  }
}
