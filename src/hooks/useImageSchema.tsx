import { createOnError } from "@/util/createOnError";
import { Schema } from "ajv";
import { UseQueryResult, useQuery } from "react-query";
/**
 * Custom hook to fetch and validate image schema using React Query.
 *
 * @param {string} relativePath - The relative path to the JSON file.
 * @param {string} schemaRelativePath - The relative path to the JSON schema file.
 * @returns {UseQueryResult} - The result of the query containing the schema and file data.
 *
 * @example
 * const { data, error, isLoading } = useImageSchema('SB_Status_00.json', 'schema.json');
 *
 * if (isLoading) {
 *   return <div>Loading...</div>;
 * }
 *
 * if (error) {
 *   return <div>Error: {error.message}</div>;
 * }
 *
 * return (
 *   <div>
 *     <pre>{JSON.stringify(data, null, 2)}</pre>
 *   </div>
 * );
 */
export const useImageSchema = (
  relativePath: string,
  schemaRelativePath: string
): UseQueryResult<{ result: { schema: Schema; file: Record<string, []> } }> => {
  return useQuery(
    ["useImageSchema", { relativePath, schemaRelativePath }],
    async () => {
      const result = await (
        await fetch(
          `/api/images/schema?rel_path=${relativePath}&schema_rel_path=${schemaRelativePath}`
        )
      ).text();
      const json = JSON.parse(result);
      return json;
    },
    {
      onError: createOnError(),
      refetchOnWindowFocus: false,
    }
  );
};
