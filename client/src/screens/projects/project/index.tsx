import React from "react";
import { useArchive } from "src/utils/archive";

const Project = () => {
  const { archive } = useArchive();

  return (
    <div>
      <h2>{archive?.name}</h2>
      {archive?.levels.map((level) => (
        <div key={level.name}>
          <h2> الصفوف:{level.name}</h2>
          <div>
            <h2>الشعب:</h2>
            <div>
              {level.divisions?.map((division) => (
                <div>
                  <h2>{division.name}</h2>
                  <div>
                    <h2>الطلاب</h2>
                    {division.employees?.map((emp) => (
                      <p>{emp.name}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Project;
