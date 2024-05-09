import { Kysely } from "kysely";
import { IDatabase, Database } from "./database.interface";

export class KyselyDatabase implements IDatabase {
  private readonly db: Kysely<Database>;

  constructor(db: Kysely<Database>) {
    this.db = db;
  }

  async getImageKeyByName(name: string): Promise<Pick<Database['image_store'], "image_key">> {
    return await this.db
      .selectFrom("image_store")
      .select("image_key")
      .where("image_name", "=", name)
      .executeTakeFirstOrThrow();
  }
}
