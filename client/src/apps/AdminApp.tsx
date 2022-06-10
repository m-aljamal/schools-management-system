import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "src/components/AppLayout";
import ProjectLayout from "src/components/ProjectLayout";
import Projects from "src/screens/projects";

const AdminApp = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<p>admin dashboard</p>} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:projectId" element={<ProjectLayout />}>
          <Route index element={<div>project screen</div>} />
          <Route path="employees" element={<div>employees screen</div>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminApp;
