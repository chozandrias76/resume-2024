import { createOnError } from "@/util/createOnError";
import { IThumbnail } from "@/util/getYoutubeContent";
import { UseQueryResult, useQuery } from "react-query";

export interface IYoutubeContent {
  result?: IThumbnail[];
  nextPageToken?: string;
  prevPageToken?: string;
}

/**
 * Custom hook to fetch YouTube content using React Query.
 * 
 * @param {string} pageToken - The token for the next page of results. Pass an empty string for the first page.
 * 
 * @returns {UseQueryResult<IYoutubeContent>} - The result of the query containing the YouTube content data.
 * 
 * @example
 * import React from 'react';
 * import { useYoutubeContent } from './path/to/your/hook';
 * 
 * const YoutubeComponent = () => {
 *   const { data, isLoading, error } = useYoutubeContent('somePageToken');
 * 
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error loading YouTube content</div>;
 * 
 *   return (
 *     <div>
 *       {data.items.map(item => (
 *         <div key={item.id}>
 *           <h3>{item.snippet.title}</h3>
 *           <p>{item.snippet.description}</p>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * };
 * 
 * export default YoutubeComponent;
 * 
 * @see https://developers.google.com/youtube/v3/determine_quota_cost for details on rate limits.
 * 
 * Rate Limits:
 * - `videos.list` endpoint: 1 unit per request.
 * - `search.list` endpoint: 100 units per request.
 */
export const useYoutubeContent = (pageToken: string): UseQueryResult<IYoutubeContent> => {
  return useQuery(
    ["youtubeContent", pageToken],
    async () => {
      try {
        const url = new URL("/api/youtube", window.location.origin)
        if (pageToken)
          url.searchParams.append("pageToken", pageToken);
        url.searchParams.append("pageSize", "2");
        const endpointResponse = await fetch(url.href, {cache: "force-cache"});
        const endpointResponseValue = await endpointResponse.text();
        const data: IYoutubeContent = JSON.parse(endpointResponseValue);
        return data;
      } catch (error: any) {
        console.error(error);
        return undefined;
      }
      
    },
    {
      onError: createOnError(),
      refetchOnWindowFocus: false,
    }
  );
};
