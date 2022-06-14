import React from "react";
import { useFindArchive } from "src/utils/archive";

const Employees = () => {
  const { archive } = useFindArchive();

  return (
    <div>
      <h1>Employees</h1>
      {archive?.name}
      <p>Levels</p>
      {archive?.levels.map((level) => (
        <>
          <p>{level.name}</p>
          <p>
            {level.divisions?.map((division) => (
              <>
                <p>{division.name}</p>
                <p>
                  {division.students.map((emp) => (
                    <p>{emp.name}</p>
                  ))}
                </p>
              </>
            ))}
          </p>
        </>
      ))}
    </div>
  );
};

export default Employees;
