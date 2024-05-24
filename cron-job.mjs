import https from "node:https";
import { Kysely, PostgresDialect } from "kysely";
import { createPool } from "@vercel/postgres";
import { config } from "dotenv";
import cron from "node-cron";

config({ path: ".env.development.local" });

const { POSTGRES_URL: connectionString } = process.env;
/*
CREATE TABLE api_data (
  api_id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
*/
const pool = createPool({
  connectionString,
});

const db = new Kysely({
  dialect: new PostgresDialect({
    pool,
  }),
});

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const { statusCode } = res;
        const contentType = res.headers["content-type"];
        let error;

        if (statusCode !== 200) {
          error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType || "")) {
          error = new Error(
            "Invalid content-type.\n" +
              `Expected application/json but received ${contentType}`
          );
        }
        if (error) {
          console.error(error.message);
          // Consume response data to free up memory
          res.resume();
          reject(error);
          return;
        }

        res.setEncoding("utf8");
        let rawData = "";
        res.on("data", (chunk) => {
          rawData += chunk;
        });
        res.on("end", () => {
          try {
            const parsedData = JSON.parse(rawData);
            resolve(parsedData);
          } catch (e) {
            console.error(e.message);
            reject(e);
          }
        });
      })
      .on("error", (e) => {
        console.error(`Got error: ${e.message}`);
        reject(e);
      });
  });
}

async function insertAPIData(data) {
  if (!data) {
    throw new Error("Cannot write data as it is undefined or null");
  }
  return await db
    .insertInto("api_data")
    .values({
      api_id: data.id,
      data: JSON.stringify(data),
      updated_at: new Date().toISOString(),
    })
    .onConflict((oc) =>
      oc.column("api_id").doUpdateSet({
        data: (eb) => eb.ref("excluded.data"),
        updated_at: (eb) => eb.ref("excluded.updated_at"),
      })
    )
    .execute();
}

async function fetchAndStoreApiData() {
  try {
    let pageNumber = 1;
    const route = (pageNumber) =>
      `https://er-inventory-api.nyasu.business/inventories/browse?page=${pageNumber}&user=banon_&pageSize=1`;
    console.info("GET ", route(pageNumber));
    const result = await fetchJson(route(pageNumber));
    // Since page size is always one, we can always skip other array elements
    insertAPIData(result.data[0]);

    const pageMax = result.pagination.total;
    while (pageMax >= pageNumber) {
      pageNumber++;

      console.info("GET ", route(pageNumber));

      const nextResult = await fetchJson(route(pageNumber));
      insertAPIData(nextResult.data[0]);
    }

    console.log("Data fetched and stored successfully");
  } catch (error) {
    console.error("Error fetching or storing data:", error);
  }
}

await fetchAndStoreApiData();

// Schedule the CRON job to run every day at midnight
cron.schedule("0 0 * * *", fetchAndStoreApiData);
