import React from "react";
import AppManager from "src/apps/AppManager";
import TeacherApp from "src/apps/TeacherApp";
import { useAuth } from "src/context/auth-context";
import AdminApp from "../apps/AdminApp";

const Auth = () => {
  const { user }: any = useAuth();
  // check if user is admin or manger or teacher
  if (user.role === "ADMIN") {
    return <AdminApp />;
  }
  if (user.role === "MANAGER") {
    return <AppManager />;
  }
  if (user.role === "TEACHER") {
    return <TeacherApp />;
  }
  return <p>Not Role found </p>;
};

export default Auth;
