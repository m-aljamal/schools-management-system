import React from "react";
import { Link } from "react-router-dom";
import { useProjectList } from "src/utils/project";

const Projects = () => {
  const { projects } = useProjectList();

  return (
    <div>
      <div>
        <Link to="/projects/create" className="p-4 text-2xl">
          +
        </Link>
      </div>
      <div className="p-4 grid  grid-cols-3 gap-5 text-center">
        {projects.map(({ id, name_ar, current_archive_id }) => (
          <Link to={`/projects/${id}/${current_archive_id}`} key={id}>
            <p className="text-xl bg-gray-200">{name_ar}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
