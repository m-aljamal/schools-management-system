import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "src/components/AppLayout";
import ProjectLayout from "src/components/ProjectLayout";
import Projects from "src/screens/projects";
import Archives from "src/screens/projects/project/Archives";
import CreateProject from "src/screens/projects/project/CreateProject";

const AdminApp = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<p>admin dashboard</p>} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/create" element={<CreateProject />} />
        <Route
          path="projects/:projectId/:archiveId"
          element={<ProjectLayout />}
        >
          <Route index element={<div>project screen</div>} />
          <Route path="employees" element={<div>employees screen</div>} />
          <Route path="archives" element={<Archives />} />
        </Route>
        <Route path="*" element={<p>Not found</p>} />
      </Route>
    </Routes>
  );
};

export default AdminApp;
