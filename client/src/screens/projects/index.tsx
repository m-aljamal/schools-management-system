import React from "react";
import { Link } from "react-router-dom";
import { useProjectList } from "src/utils/projec";

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
        {projects.map((pro) => (
          <Link to={`/projects/${pro.id}`} key={pro.id}>
            <p className="text-xl bg-gray-200">{pro.name_ar}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
