import { readImageSchema } from "@/util/readImageSchema";

export async function GET(request: Request) {
  const requestURL = new URL(request.url);

  const queryParams = requestURL.searchParams;
  const relativePath = queryParams.get("rel_path");
  const schemaRelativePath = queryParams.get("schema_rel_path");

  try {
    if (relativePath === null) {
      throw new Error("Can not query on this route without rel_path");
    }
    if (schemaRelativePath === null) {
      throw new Error("Can not query on this route without schema_rel_path");
    }
    const { schema, file } = readImageSchema(schemaRelativePath, relativePath);

    return Response.json(
      {
        result: {
          schema: JSON.parse(schema.toString("utf8")),
          file: JSON.parse(file.toString("utf8")),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Failed to fetch data:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
