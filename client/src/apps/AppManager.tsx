import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "src/components/AppLayout";
import ProjectLayout from "src/components/ProjectLayout";
import { useAuth } from "src/context/auth-context";
import Employees from "src/screens/projects/project/Employees";
import ProjectScreen from "src/screens/projects/project/index";
const AppManager = () => {
  const { user }: any = useAuth();

  return (
    <Routes>
      <Route path="projects/:projectId/:archiveName" element={<AppLayout />}>
        <Route index element={<ProjectScreen />} />

        <Route path="employees" element={<Employees />} />
      </Route>
      <Route
        path="*"
        element={
          <Navigate
            to={`/projects/${user.project.id}/${user.project.current_archive_name}`}
          />
        }
      />
    </Routes>
  );
};

export default AppManager;
