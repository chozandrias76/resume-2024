import { IThumbnail } from "@/app/api/youtube/route";
import { UseQueryResult, useQuery } from "react-query";

interface IYoutubeContent {
  result?: IThumbnail[];
  nextPageToken?: string;
  prevPageToken?: string;
}

export const useYoutubeContent = (pageToken: string): UseQueryResult<IYoutubeContent> => {
  return useQuery(
    ["youtubeContent", pageToken],
    async () => {
      const endpointResponse = await fetch("/api/youtube");
      const endpointResponseValue = await endpointResponse.text();
      const data: IYoutubeContent = JSON.parse(endpointResponseValue);
      return data;
    },
    { onError: (error) => console.error("Error fetching Youtube Content", error) }
  );
};
