import React from "react";
import { useLevels } from "src/utils/levels";

const Students = () => {
  const { levels } = useLevels();

  return (
    <div>
      <h2>الطلاب:</h2>
      <div className="grid grid-cols-3 gap-5">
        {levels.map(({ archive, id, name, divisions }) => (
          <div key={id} className="bg-gray-200">
            <p className=" text-red-400">الصف:{name}</p>
            {divisions?.map(({ name, students, employees }) => (
              <div key={name}>
                <p className="text-green-800"> الشعبة:{name}</p>
                <div>
                  {students?.map(({ id, name }) => (
                    <p key={id}>{name}</p>
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
