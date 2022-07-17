import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "src/components/AppLayout";
import { useAuth } from "src/context/auth-context";
import ProjectScreen from "src/screens/projects/project/index";
import Subjects from "src/screens/student/Subjects";

const StudentApp = () => {
  const { user }: any = useAuth();
  return (
    <Routes>
      <Route path="project/:archiveId" element={<AppLayout />}>
        <Route index element={<ProjectScreen />} />
        <Route path="subjects" element={<Subjects />} />
      </Route>
      <Route
        path="*"
        element={
          <Navigate to={`/project/${user.project.current_archive_id}`} />
        }
      />
    </Routes>
  );
};

export default StudentApp;
