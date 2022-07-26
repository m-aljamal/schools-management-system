import React from "react";
import { useSubjects_by_level } from "src/utils/subject";

const Subjects = () => {
  const { levels } = useSubjects_by_level();

  return (
    <div className="p-5 grid grid-cols-3 gap-5 ">
      {levels.map(({ id, name, subjects }) => (
        <div key={id} className="bg-gray-300 p-2">
          <p className="mb-2 text-red-700 ">{name}</p>
          <div>
            {subjects.map(({ id, name }) => (
              <div className="py-1" key={id}>
                <p>{name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Subjects;
