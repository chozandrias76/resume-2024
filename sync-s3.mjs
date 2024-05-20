import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { config } from 'dotenv';
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { AWS_BUCKET_NAME: Bucket } = process.env;

if (!Bucket) {
  throw new Error("Bucket required for listing objects");
}

const credentials = fromNodeProviderChain();
const s3Client = new S3Client({ credentials });

const params = {
  Bucket,
  Prefix: "wasm/",
};

const syncS3 = async () => {
  try {
    const data = await s3Client.send(new ListObjectsV2Command(params));
    if (!data.Contents) {
      console.log('No objects found in the specified S3 bucket prefix.');
      return;
    }
    
    for (const item of data.Contents) {
      if (item.Key.endsWith('/')) {
        // Skip directories
        continue;
      }

      const fileParams = {
        Bucket: params.Bucket,
        Key: item.Key,
      };
      const file = await s3Client.send(new GetObjectCommand(fileParams));
      const fileStream = file.Body;
      const filePath = path.join(__dirname, 'public', 'wasm', item.Key.replace(params.Prefix, ''));
      const fileDir = path.dirname(filePath);

      // Ensure the directory exists
      fs.mkdirSync(fileDir, { recursive: true });

      const writeStream = fs.createWriteStream(filePath);

      fileStream.pipe(writeStream);

      fileStream.on('end', () => {
        writeStream.close();
        console.log(`File ${filePath} written successfully.`);
      });

      fileStream.on('error', (err) => {
        console.error(`Error writing file ${filePath}:`, err);
      });
    }
    console.log('S3 sync complete');
  } catch (error) {
    console.error('Error syncing S3:', error);
  }
};


syncS3();
