import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function GET(request: Request) {
    const url = new URL(request.url, `http://localhost`);
    const queryParams = url.searchParams;

    // Accessing the query parameters
    const bucketName = queryParams.get('bucket_name') || "";
    const objectKey = queryParams.get('object_key') || "";
    
    const credentials = fromNodeProviderChain();
    const s3Client = new S3Client({ credentials });

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
    });
  
    try {
      const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL valid for 1 hour
      return Response.json({result: signedUrl}, {status: 200})
    } catch (error: any) {
      console.error("Error getting presigned URL", error);
      return Response.json({error: error.message}, {status: 500})
    }
}