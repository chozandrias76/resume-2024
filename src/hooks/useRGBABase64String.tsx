import { UseQueryResult, useQuery } from "react-query";

export const useRGBABase64String = (encodedString: string): UseQueryResult<Uint8ClampedArray  | undefined> => {
  return useQuery(
    ["useRGBABase64String", encodedString],
    async () => {
      if(!encodedString) return;
      return Uint8ClampedArray.from(atob(encodedString), c => c.charCodeAt(0));

    },
    {onError: (error) => console.error("Error fetching RGBABase64String", error),}
  )
}