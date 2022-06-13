import {
  useFindAllArchivesQuery,
  FindAllArchivesQuery,
} from "src/generated/generates";
import graphqlRequestClient from "./graphqlRequestClient";
function useArchiveList() {
  const { data, error } = useFindAllArchivesQuery<FindAllArchivesQuery, Error>(
    graphqlRequestClient()
  );
  return {
    archives: data?.findAllArchives || [],
  };
}

export { useArchiveList };
