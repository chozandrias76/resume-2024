import { useQuery } from "react-query";
import { readStreamAsText } from "@/util/readStreamAsText";

export const usePresignedImageUrl = (imageName: string) => {
  return useQuery(
    ["presignedImageUrl", imageName],
    async () => {
      const objectKey = (await fetch(`/api/images?image_name=${imageName}`))
        .body;
      if (!objectKey) {
        throw new Error("Failed to retrieve object key from database");
      }
      const text = await readStreamAsText(objectKey);
      const imageURL = (
        await fetch(
          `/api/s3?bucket_name=swensonhcp-resume-website&object_key=${
            JSON.parse(text).result
          }`
        )
      ).body;

      return JSON.parse(await readStreamAsText(imageURL)).result;
    },
    {
      // Configure options here, such as cache time.
      staleTime: 3600 * 1000, // 1 hour, same as URL expiration
      cacheTime: 3600 * 1000,
      onError: (error) => console.error("Error fetching presigned URL", error),
    }
  );
};
