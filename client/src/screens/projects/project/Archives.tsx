import React from "react";
import { Link } from "react-router-dom";
import { useArchiveList } from "src/utils/archive";

const Archives = () => {
  const { archives } = useArchiveList();

  return (
    <div className="p-4 ">
      {archives.map(({ id, name, project }) => (
        <div key={id} className="py-4">
          <Link to={`/projects/${project.id}/${id}`}>
            <p>{name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Archives;
