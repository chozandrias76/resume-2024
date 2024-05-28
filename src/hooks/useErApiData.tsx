import type { ERApiData } from "@/lib/erApiData.interface";
import { createOnError } from "@/util/createOnError";
import { UseQueryResult, useQuery } from "react-query";


export const useErApiData = (buildId: string): UseQueryResult<ERApiData> => {
  return useQuery(
    ["erApiData", buildId],
    async () => {
      if(!buildId) return {};
      const endpointResponse = await fetch(`/api/er-inventory?b=${buildId}`);
      const endpointResponseValue = await endpointResponse.text();
      const data: ERApiData = JSON.parse(endpointResponseValue);
      return data;
    },
    {
      onError: createOnError(),
      refetchOnWindowFocus: false,
    }
  );
};
