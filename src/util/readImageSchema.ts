import * as fs from "node:fs";

export function readImageSchema(schemaRelativePath: string, relativePath: string) {
  const fullFilePath = `./public/elden-ring/raw/${relativePath}`;
  const schemaFullFilePath = `./public/elden-ring/raw/${schemaRelativePath}`;
  return {file: fs.readFileSync(fullFilePath), schema: fs.readFileSync(schemaFullFilePath)};
}
