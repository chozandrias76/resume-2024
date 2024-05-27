import * as fs from "node:fs";
import { join } from "path";

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
  const jsonPath = join(process.cwd(), "public/elden-ring/raw", relativePath);
  const schemaPath = join(process.cwd(), "public/elden-ring/raw", schemaRelativePath);
  try {
    return {
      file: fs.readFileSync(jsonPath),
      schema: fs.readFileSync(schemaPath),
    };
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      try {
        const files = listFiles(join(process.cwd(), 'public'));
        throw new Error(`${error.message}. Available files: ${files.join(', ')}`);
      } catch (fsError: any) {
        throw new Error(`${error.message}. Additionally, failed to list files: ${fsError.message}`);
      }
    } else {
      throw error;
    }
  }
}

function _readImageSchema(
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
