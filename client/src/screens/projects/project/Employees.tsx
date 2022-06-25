import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEmployees } from "src/utils/employees";
import { useLevels } from "src/utils/levels";

const Employees = () => {
  const { employees } = useEmployees();
  const { levels } = useLevels();
  const { projectId, archiveName } = useParams();
  return (
    <div className="p-4">
      <h1>الموظفين</h1>
      <div className="grid grid-cols-3 gap-5">
        {employees.map(({ name, id, jobTitle }) => (
          <div key={id} className="bg-gray-200  ">
            <Link to={`/projects/${projectId}/${archiveName}/employee/${id}`}>
              <p>الاسم:{name}</p>
              <p>الاسم الوظيفي:{jobTitle}</p>
            </Link>
          </div>
        ))}
      </div>
      <p>المدرسين:</p>
      <div className="grid grid-cols-3 gap-5">
        {levels.map(({ archive, id, name, divisions }) => (
          <div key={id} className="bg-gray-200">
            <p className=" text-red-400">الصف:{name}</p>
            {divisions?.map(({ name, students, employees }) => (
              <div key={name}>
                <p className="text-green-800"> الشعبة:{name}</p>
                <div>
                  {employees?.map(({ id, name }) => (
                    <Link
                      to={`/projects/${projectId}/${archiveName}/employee/${id}`}
                    >
                      <p key={id}>{name}</p>
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

export default Employees;