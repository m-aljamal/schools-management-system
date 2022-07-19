import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "src/components/AppLayout";
import { useAuth } from "src/context/auth-context";
import Absent from "src/screens/projects/project/Absent";
import Archives from "src/screens/projects/project/Archives";
import Employee from "src/screens/projects/project/Employee";
import Employees from "src/screens/projects/project/Employees";
import Exams from "src/screens/projects/project/Exams";
import ProjectScreen from "src/screens/projects/project/index";
import Level from "src/screens/projects/project/Level";
import Levels from "src/screens/projects/project/Levels";
import Student from "src/screens/projects/project/Student";
import Students from "src/screens/projects/project/Students";
const AppManager = () => {
  const { user }: any = useAuth();

  return (
    <Routes>
      <Route path="projects/:projectId/:archiveId" element={<AppLayout />}>
        <Route index element={<ProjectScreen />} />

        <Route path="employees" element={<Employees />} />
        <Route path="employees/:employeeId" element={<Employee />} />
        <Route path="students" element={<Students />} />
        <Route path="absent" element={<Absent />} />
        <Route path="students/:studentId" element={<Student />} />
        {/* <Route path="exams" element={<Exams />} /> */}
        <Route path="levels" element={<Levels />} />
        <Route path="levels/:levelId" element={<Level />} />
        <Route path="archives" element={<Archives />} />
      </Route>
      <Route
        path="*"
        element={
          <Navigate
            to={`/projects/${user.project.id}/${user.project.current_archive_id}`}
          />
        }
      />
    </Routes>
  );
};

export default AppManager;
