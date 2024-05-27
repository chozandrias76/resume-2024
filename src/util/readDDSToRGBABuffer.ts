import {parseDDSHeader, decodeImage} from "dds-ktx-parser/dist/index.mjs"
import fs from "node:fs"


export function readDDSToRGBABuffer(file: string): Buffer | undefined {
  const buffer = fs.readFileSync(file)
  const imageInfo = parseDDSHeader(buffer)
  if (imageInfo) {
      return decodeImage(buffer, imageInfo.format, imageInfo.layers[0])
  }
}