import React from "react";
import { useParams } from "react-router-dom";
import { useEmployee } from "src/utils/employees";

const Employee = () => {
  const { employee } = useEmployee();
  return (
    <div>
      <p>{employee?.name}</p>
      <p className="grid grid-cols-3">
        {employee?.levels.map(({ id, name, divisions }) => (
          <div>
            <p key={id} className="text-green-700 ">
              {name}
            </p>
            <div>
              {divisions?.map(({ id, name }) => (
                <p className="text-red-700">{name}</p>
              ))}
            </div>
          </div>
        ))}
      </p>
    </div>
  );
};

export default Employee;
