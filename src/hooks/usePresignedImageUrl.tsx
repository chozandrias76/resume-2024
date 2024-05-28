import { useQuery, UseQueryResult } from "react-query";
import { readStreamAsText } from "@/util/readStreamAsText";
import { createOnError } from "@/util/createOnError";

export const usePresignedImageUrl = (imageName: string): UseQueryResult<string> => {
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
      onError: createOnError(),
      refetchOnWindowFocus: false,
    }
  );
};
