import AppManager from "src/apps/AppManager";
import StudentApp from "src/apps/StudentApp";
import TeacherApp from "src/apps/TeacherApp";
import { useAuth } from "src/context/auth-context";
import { Role } from "src/generated/generates";
import AdminApp from "../apps/AdminApp";

const Auth = () => {
  const { user }: any = useAuth();

  switch (user.role) {
    case Role.Admin:
      return <AdminApp />;
    case Role.DataEntry:
      return <AppManager />;
    case Role.Teacher:
      return <TeacherApp />;
    case Role.Student:
      return <StudentApp />;
    default:
      return <p>No Role found </p>;
  }
};

export default Auth;
