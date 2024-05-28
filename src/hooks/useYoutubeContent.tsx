import { createOnError } from "@/util/createOnError";
import { UseQueryResult, useQuery } from "react-query";

export interface IYoutubeContent {
  result?: {
    data: [{id: string, embed_html: string, description: string, title: string, thumbnail_url: string}],
    length?: string
  };
}

/**
 * Custom hook to fetch YouTube content using React Query.
 *
 * @param {string} page - The number for page of results. Pass "0" for the first page.
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
 */
export const useYoutubeContent = (
  page: string
): UseQueryResult<IYoutubeContent> => {
  return useQuery(
    ["youtubeContent", page],
    async () => {
      try {
        const url = new URL("/api/youtube", window.location.origin);
        url.searchParams.append("page", page);
        const endpointResponse = await fetch(url.href, {
          cache: "force-cache",
        });
        const endpointResponseValue = await endpointResponse.text();
        const data = JSON.parse(endpointResponseValue);
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
