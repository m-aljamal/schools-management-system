import { Link } from "react-router-dom";
import { useUrlParams } from "src/context/auth-context";
import { useStudentsList_levels_divisions } from "src/utils/levels";

const Students = () => {
  const { levels } = useStudentsList_levels_divisions();
  const { archiveId, projectId } = useUrlParams();
  return (
    <div>
      <h2>الطلاب:</h2>
      <div className="grid grid-cols-3 gap-5">
        {levels.map(({ id, name, divisions }) => (
          <div key={id} className="bg-gray-200">
            <p className=" text-red-400">الصف:{name}</p>
            {divisions?.map(({ name, students }) => (
              <div key={name}>
                <p className="text-green-800"> الشعبة:{name}</p>
                <div>
                  {students?.map(({ id, name }) => (
                    <Link
                      key={id}
                      to={`/projects/${projectId}/${archiveId}/students/${id}`}
                    >
                      <p key={id}>{name}</p>
                      <p>{id}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
