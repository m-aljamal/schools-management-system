import AppManager from "src/apps/AppManager";
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
      return <p>Student App</p>;
    default:
      return <p>No Role found </p>;
  }
};

export default Auth;
