import {
  FindArchiveQuery,
  FindArchivesQuery,
  useFindArchivesQuery,
} from "./../generated/generates";
import { useFindArchiveQuery } from "src/generated/generates";
import { useAuthClient } from "src/context/auth-context";

function useArchiveList() {
  const { client, projectId } = useAuthClient();
  const { data, error } = useFindArchivesQuery<FindArchivesQuery, Error>(
    client(),
    {
      projectId,
    }
  );
  return {
    archives: data?.findArchives || [],
  };
}

function useArchive() {
  const { client, projectId, archiveName } = useAuthClient();
  const { data, error } = useFindArchiveQuery<FindArchiveQuery, Error>(
    client(),
    {
      projectId,
      name: archiveName,
    }
  );
  return {
    archive: data?.findArchive || null,
  };
}

export { useArchiveList, useArchive };
