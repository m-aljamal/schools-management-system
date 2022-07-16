import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "src/components/AppLayout";
import { useAuth } from "src/context/auth-context";
import ProjectScreen from "src/screens/projects/project/index";
import Students from "src/screens/teacher/Students.teacher";

const TeacherApp = () => {
  const { user }: any = useAuth();
  return (
    <Routes>
      <Route path="project/:archiveId" element={<AppLayout />}>
        <Route index element={<ProjectScreen />} />
        <Route path="students" element={<Students />} />
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

export default TeacherApp;
