import { FindArchiveQuery } from "./../generated/generates";
import {
  useFindAllArchivesQuery,
  FindAllArchivesQuery,
  useFindArchiveQuery,
} from "src/generated/generates";
import graphqlRequestClient from "./graphqlRequestClient";
import { useParams } from "react-router-dom";
function useArchiveList() {
  const { data, error } = useFindAllArchivesQuery<FindAllArchivesQuery, Error>(
    graphqlRequestClient()
  );
  return {
    archives: data?.findAllArchives || [],
  };
}

function useFindArchive() {
  const { archiveId } = useParams();
  const { data, error } = useFindArchiveQuery<FindArchiveQuery, Error>(
    graphqlRequestClient(),
    {
      name: archiveId as string,
    }
  );
  return {
    archive: data?.findArchive || null,
  };
}

export { useArchiveList, useFindArchive };
