import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "src/components/AppLayout";
import ProjectLayout from "src/components/ProjectLayout";
import Employees from "src/screens/projects/project/Employees";
import ProjectScreen from "src/screens/projects/project/index";
const AppManager = () => {
  return (
    <Routes>
      <Route
        path="projects/:projectId/:archiveName"
        element={<AppLayout />}
      >
        <Route index element={<ProjectScreen />} />
        <Route path="employees" element={<Employees />} />
      </Route>
    </Routes>
  );
};

export default AppManager;
