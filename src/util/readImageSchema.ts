import * as fs from "node:fs";
import { join } from "path";

export function readImageSchema(
  schemaRelativePath: string,
  relativePath: string
) {
  const jsonPath = join(process.cwd(), "public/elden-ring/raw", relativePath);
  const schemaPath = join(
    process.cwd(),
    "public/elden-ring/raw",
    schemaRelativePath
  );
  return {
    file: fs.readFileSync(jsonPath),
    schema: fs.readFileSync(schemaPath),
  };
}
