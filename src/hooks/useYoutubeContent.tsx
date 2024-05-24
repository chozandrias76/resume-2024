import { IThumbnail } from "@/util/getYoutubeContent";
import { UseQueryResult, useQuery } from "react-query";

export interface IYoutubeContent {
  result?: IThumbnail[];
  nextPageToken?: string;
  prevPageToken?: string;
}

export const useYoutubeContent = (pageToken: string): UseQueryResult<IYoutubeContent> => {
  return useQuery(
    ["youtubeContent", pageToken],
    async () => {
      const endpointResponse = await fetch("/api/youtube", {cache: "force-cache"});
      const endpointResponseValue = await endpointResponse.text();
      const data: IYoutubeContent = JSON.parse(endpointResponseValue);
      return data;
    },
    { onError: (error) => console.error("Error fetching Youtube Content", error) }
  );
};
