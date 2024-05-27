import { UseQueryResult, useQuery } from "react-query";

export const useDDS = (relativePath: string): UseQueryResult<string> => {
  return useQuery(
    ["useDDS", relativePath],
    async () => {
      const result = await (await fetch(`/api/dds?rel_path=${relativePath}`)).text()
      const json = JSON.parse(result)
      return json.data;
    },
    {onError: (error) => console.error("Error fetching presigned URL", error),}
  )
}