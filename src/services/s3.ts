import { NextResponse } from "next/server";

export const getPresignedImageUrl = async (bucketName: string, objectKey: string) => {
  try {
    const response = await fetch(`/api/s3?bucket_name=${bucketName}&object_key=${objectKey}`) as NextResponse;
    return JSON.parse(await readStreamAsText(response.body)).result;

  } catch (error) {
    console.error("Error getting presigned image url from S3", error);
    return null;
  }
};

export const fetchImageKeyFromDB = async (imageName: string) => {
  try {
    const response = await fetch(`/api/images?image_name=${imageName}`) as NextResponse;
    return response.body;
  } catch (error) {
    console.error("Error fetching image key from database", error);
    return null;
  }
};

async function readStreamAsText(stream: ReadableStream<Uint8Array> | null) {
  if(!stream) {
    return ""
  }
  const reader = stream.getReader();
  let result = '';
  let decoder = new TextDecoder(); // Default is utf-8
  while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      result += decoder.decode(value, { stream: true });
  }
  result += decoder.decode(); // flush the decoder
  return result;
}
