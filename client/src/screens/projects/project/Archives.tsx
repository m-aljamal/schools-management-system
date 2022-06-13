import React from "react";
import { useArchiveList } from "src/utils/archive";

const Archives = () => {
  const { archives } = useArchiveList();

  return (
    <div className="p-4 ">
      {archives.map(({ id, name }) => (
        <div key={id} className="py-4">
          <p>{name}</p>
        </div>
      ))}
    </div>
  );
};

export default Archives;
