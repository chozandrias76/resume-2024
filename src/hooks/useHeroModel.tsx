import { UseQueryResult, useQuery } from "react-query";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

async function fetchAndParseModel(url: string) {
  const response = await fetch(url);
  const base64 = await response.text();

  return base64;
}

export const useHeroModel = (): UseQueryResult<ReturnType<typeof OBJLoader.prototype.parse>> => {
  return useQuery(
    ["heroModel"],
    async () => {
      const model = await fetchAndParseModel("/api/models?file_type=obj")
      const loader = new OBJLoader();
      const loadedModel = loader.parse(model);
      return loadedModel;
    },
    {onError: (error) => console.error("Error fetching presigned URL", error),}
  )
}