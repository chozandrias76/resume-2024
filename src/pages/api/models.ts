import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { readStreamAsText } from "@/util/readStreamAsText";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "GET") {
    let { file_type: fileType } = request.query;
    fileType ||= "stl";
    try {
      const fileResponse = (
        await fetch(
          `${request.headers.referer}/api/s3?bucket_name=swensonhcp-resume-website&object_key=bust01.${fileType}`
        )
      );

      if (!fileResponse.ok) {
        throw new Error('Failed to fetch file from S3');
      }
      const fileSize = fileResponse.headers.get('Content-Length')

      response.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Length": fileSize || "",
      });

      const fileURL = 
        JSON.parse(await readStreamAsText(fileResponse.body)).result;
      const s3Response = await fetch(fileURL)

      const reader = s3Response.body?.getReader();
      const stream = new ReadableStream({
        async start(controller) {
          if(!reader) return;

          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              controller.close();
              break;
            }
            controller.enqueue(value);
          }
        }
      });

      const streamReader = stream.getReader();

      while (true) {
        const { done, value } = await streamReader.read();
        if (done) {
          break;
        }
        response.write(value);
      }
      response.end()
    } catch (err) {
      console.error(err);
      response.status(500).json({ message: "File could not be read" });
    }
  } else {
    response.status(405).json({ message: "Method not allowed" });
  }
}
