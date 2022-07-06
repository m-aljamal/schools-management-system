import React from "react";
import { Link, useParams } from "react-router-dom";
import { useUrlParams } from "src/context/auth-context";
import { useEmployees } from "src/utils/employees";
import { useLevelsForEmployees } from "src/utils/levels";

const Employees = () => {
  const { employees } = useEmployees();
  const { levels } = useLevelsForEmployees();
  const { archiveId, projectId } = useParams();
  return (
    <div className="p-4">
      <h1>الموظفين</h1>
      <div className="grid grid-cols-3 gap-5">
        {employees.map(({ name, id }) => (
          <div key={id} className="bg-gray-200  ">
            <Link to={`/projects/${projectId}/${archiveId}/employee/${id}`}>
              <p>الاسم:{name}</p>
              <p>الاسم الوظيفي:</p>
            </Link>
          </div>
        ))}
      </div>
      <p>المدرسين:</p>
      <div className="grid grid-cols-3 gap-5">
        {levels.map(({ archive, id, name, divisions }) => (
          <div key={id} className="bg-gray-200">
            <p className=" text-red-400">الصف:{name}</p>
            {divisions?.map(({ name, employees }) => (
              <div key={name}>
                <p className="text-green-800"> الشعبة:{name}</p>
                <div>
                  {employees?.map(({ id, name }) => (
                    <Link
                      to={`/projects/${projectId}/${archiveId}/employee/${id}`}
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
