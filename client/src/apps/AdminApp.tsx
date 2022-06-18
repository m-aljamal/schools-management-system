import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "src/components/AppLayout";
import ProjectLayout from "src/components/ProjectLayout";
import Projects from "src/screens/projects";
import Project from "src/screens/projects/project";
import Archives from "src/screens/projects/project/Archives";
import CreateProject from "src/screens/projects/project/CreateProject";
import Employee from "src/screens/projects/project/Employee";
import Employees from "src/screens/projects/project/Employees";
import Students from "src/screens/projects/project/Students";

const AdminApp = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<p>admin dashboard</p>} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/create" element={<CreateProject />} />
        <Route
          path="projects/:projectId/:archiveName"
          element={<ProjectLayout />}
        >
          <Route index element={<Project />} />
          <Route path="employees" element={<Employees />} />
          <Route path="students" element={<Students />} />
          <Route path="employee/:employeeId" element={<Employee />} />
          <Route path="archives" element={<Archives />} />
        </Route>
        <Route path="*" element={<p>Not found</p>} />
      </Route>
    </Routes>
  );
};

export default AdminApp;
