import { Database } from "@/lib/database.interface";
import { UseQueryResult, useQuery } from "react-query";

export const useExperience = (positions: number): UseQueryResult<Database['experience'][]> => {
  return useQuery(
    ["experience", positions],
    async () => {
      const {result: experiences}: {result: Database['experience'][]} = JSON.parse(await (await fetch(`/api/experiences?positions=${positions}`)).text())
      return experiences;
    },
    {onError: (error) => console.error("Error fetching presigned URL", error),}
  )
}