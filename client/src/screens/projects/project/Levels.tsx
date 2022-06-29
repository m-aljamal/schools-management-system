import React from "react";
import { useLevels } from "src/utils/levels";

const Levels = () => {
  const { levels } = useLevels();

  return (
    <div className="p-4">
      <h1>صفوف المدرسة</h1>
      {levels.map(({ id, name, divisions }) => (
        <div key={id}>
          <h2> {name}</h2>
          <div>
            {divisions?.map(({ id, name }) => (
              <div key={id}>
                <h2>{name}</h2>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Levels;
