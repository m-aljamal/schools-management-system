import { useAuthClient } from "src/context/auth-context";
import { useFindExamsQuery, FindExamsQuery } from "src/generated/generates";

function useExam(semesterId: string) {
  const { client } = useAuthClient();
  const { data } = useFindExamsQuery<FindExamsQuery, Error>(client(), {
    semesterId,
  });
  return {
    exams: data?.findExams || [],
  };
}

export { useExam };
