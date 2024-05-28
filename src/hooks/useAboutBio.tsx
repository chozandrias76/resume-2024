import { createOnError } from "@/util/createOnError";
import { UseQueryResult, useQuery } from "react-query";


export const useAboutBio = (): UseQueryResult<string> => {
  return useQuery(
    ["aboutBio"],
    async () => {
      const {result: bio} = JSON.parse(await (await fetch("/api/bios")).text())
      return bio;
    },
    {
      onError: createOnError(),
      refetchOnWindowFocus: false,
    }
  )
}