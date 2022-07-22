import React from "react";
import { Link } from "react-router-dom";
import { useUrlParams } from "src/context/auth-context";
import { useMangersList } from "src/utils/employees";
import { useTeachersList_levels } from "src/utils/levels";

const Employees = () => {
  const { managers } = useMangersList();
  const { archiveId, projectId } = useUrlParams();
  const { teachers } = useTeachersList_levels();
  return (
    <div className="p-4">
      <h1>الموظفين</h1>
      <div className="grid grid-cols-3 gap-5">
        {managers.map(({ id, name, role }) => (
          <div key={id} className="bg-gray-200 p-5">
            <p>الاسم: {name}</p>
            <p>{id}</p>
            <p>المسمى الوظيفي: {role}</p>
          </div>
        ))}
      </div>
      <p>المدرسين:</p>
      <div className="grid grid-cols-3 gap-5">
        {teachers.map(({ id, name, divisions }) => (
          <div key={id} className="bg-gray-200">
            <p className=" text-red-400">الصف:{name}</p>
            {divisions?.map(({ name, employees, id }) => (
              <div key={id}>
                <p className="text-green-800"> الشعبة:{name}</p>
                <div>
                  {employees?.map(({ id, name }) => (
                    <Link
                      key={id}
                      to={`/projects/${projectId}/${archiveId}/employees/${id}`}
                    >
                      <p>{name}</p>
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

export default Employees;
