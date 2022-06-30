import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "src/components/AppLayout";
import { useAuth } from "src/context/auth-context";
import Archives from "src/screens/projects/project/Archives";
import Employees from "src/screens/projects/project/Employees";
import ProjectScreen from "src/screens/projects/project/index";
import Levels from "src/screens/projects/project/Levels";
import Students from "src/screens/projects/project/Students";
const AppManager = () => {
  const { user }: any = useAuth();

  return (
    <Routes>
      <Route path="projects/:projectId/:archiveName" element={<AppLayout />}>
        <Route index element={<ProjectScreen />} />

        <Route path="employees" element={<Employees />} />
        <Route path="students" element={<Students />} />
        <Route path="levels" element={<Levels />} />
        <Route path="archives" element={<Archives />} />
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
