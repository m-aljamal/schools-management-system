import {
  FindArchiveIdQuery,
  FindArchiveQuery,
  FindArchivesQuery,
  useFindArchiveIdQuery,
  useFindArchivesQuery,
} from "./../generated/generates";
import { useFindArchiveQuery } from "src/generated/generates";
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
  const { projectId, archiveName } = useUrlParams();
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

function useFindArchiveId(name: string, projectId: string) {
  const { client } = useAuthClient();
  const { data } = useFindArchiveIdQuery<FindArchiveIdQuery, Error>(client(), {
    name,
    projectId,
  });
  return {
    archiveId: data?.findArchiveId.id || "",
  };
}

export { useArchiveList, useArchive, useFindArchiveId };
