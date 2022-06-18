import { useParams } from "react-router-dom";
import { FindLevelsQuery, useFindLevelsQuery } from "src/generated/generates";
import graphqlRequestClient from "./graphqlRequestClient";

function useLevels() {
  const { archiveName } = useParams();
  const { data } = useFindLevelsQuery<FindLevelsQuery, Error>(
    graphqlRequestClient(),
    {
      archiveName: archiveName as string,
      find: "ALL",
    }
  );
  return {
    levels: data?.findLevels || [],
  };
}

export { useLevels };
