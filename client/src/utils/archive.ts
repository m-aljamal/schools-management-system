import {
  FindArchiveQuery,
  FindArchivesQuery,
  useFindArchiveQuery,
  useFindArchivesQuery,
} from "./../generated/generates";
import { useAuthClient, useUrlParams } from "src/context/auth-context";

function useArchiveList() {
  const { client } = useAuthClient();
  const { projectId } = useUrlParams();

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
  const { client } = useAuthClient();
  const { projectId, archiveId } = useUrlParams();
  const { data, error } = useFindArchiveQuery<FindArchiveQuery, Error>(
    client(),
    {
      projectId,
      archiveId,
    }
  );
  return {
    archive: data?.findArchive || null,
  };
}

export { useArchiveList, useArchive };
