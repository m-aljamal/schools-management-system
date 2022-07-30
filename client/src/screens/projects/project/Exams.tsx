import { Link } from "react-router-dom";
import Pdf from "src/components/Pdf";
import { useUrlParams } from "src/context/auth-context";
import { useExamsListByArchiveId } from "src/utils/exam";

const Exams = () => {
  const { exams } = useExamsListByArchiveId();
  const { archiveId, projectId } = useUrlParams();
  return (
    <div className="p-10">
      exams
      <h1>الامتحانات:</h1>
      <div className="grid grid-cols-3 gap-5 mt-5">
        {exams.map(({ id, level: { id: levelId, name } }) => (
          <div key={id} className="bg-gray-300 p-5">
            <p>exam id </p>
            <p>{id}</p>
            <Link to={`/projects/${projectId}/${archiveId}/exams/${levelId}`}>
              <h2>{name}</h2>
              <p>البداية:</p>
              <p>النهاية:</p>
              <p>الطلاب:</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exams;
