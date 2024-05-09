import { useQuery } from 'react-query';
import { fetchImageKeyFromDB, getPresignedImageUrl } from '@/services/s3';

export const usePresignedImageUrl = (imageName: string) => {
  return useQuery(
    ['presignedImageUrl', imageName], 
    async () => {
      const objectKey = await fetchImageKeyFromDB(imageName);
      if (!objectKey) {
        throw new Error('Failed to retrieve object key from database');
      }
      const text = await readStreamAsText(objectKey);
      return getPresignedImageUrl("swensonhcp-resume-website", JSON.parse(text).result);
    },
    {
      // Configure options here, such as cache time.
      staleTime: 3600 * 1000, // 1 hour, same as URL expiration
      cacheTime: 3600 * 1000,
      onError: (error) => console.error('Error fetching presigned URL', error),
    }
  );
};


async function readStreamAsText(stream: ReadableStream<Uint8Array>) {
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
