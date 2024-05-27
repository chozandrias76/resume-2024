import * as fs from "node:fs";
import { join } from "path";

const imageSchemaRoute = "public/elden-ring/raw";

function listFiles(dir: string): string[] {
  const results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of list) {
    const filePath = join(dir, file.name);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results.push(...listFiles(filePath));
    } else {
      results.push(filePath);
    }
  }
  return results;
}

export function readImageSchema(
  schemaRelativePath: string,
  relativePath: string
) {
  const jsonPath = join(process.cwd(), imageSchemaRoute, relativePath);
  const schemaPath = join(process.cwd(), imageSchemaRoute, schemaRelativePath);
  try {
    return {
      file: fs.readFileSync(jsonPath),
      schema: fs.readFileSync(schemaPath),
    };
  } catch (error: any) {
    // This might expose too much to the client, but for now it's fine
    if (error.code === "ENOENT") {
      try {
        const files = listFiles(join(process.cwd(), imageSchemaRoute));
        throw new Error(
          `${error.message}. Available files: ${files.join(", ")}`
        );
      } catch (fsError: any) {
        throw new Error(
          `${error.message}. Additionally, failed to list files: ${fsError.message}`
        );
      }
    } else {
      throw error;
    }
  }
}
