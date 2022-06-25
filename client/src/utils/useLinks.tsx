import { useProjectId } from "./auth-provider";
import { AiOutlinePieChart } from "react-icons/ai";
import { useAuth } from "src/context/auth-context";

export const useProjectLinks = () => {
  const { archiveName, projectId } = useProjectId();
  const { user }: any = useAuth();
  const adminLinks = [
    {
      to: "/",
      label: "لوحة التحكم",
      icon: <AiOutlinePieChart />,
    },
    {
      to: "/projects",
      label: "المشاريع",
      icon: <AiOutlinePieChart />,
    },
    {
      to: "/employees",
      label: "الموظفين",
      icon: <AiOutlinePieChart />,
    },
  ];
  const mangerLinks = [
    {
      label: "الرئيسية",
      to: `/projects/${projectId}/${archiveName}`,
      icon: <AiOutlinePieChart />,
    },

    {
      label: "الموظفين ",
      to: `/projects/${projectId}/${archiveName}/employees`,
      icon: <AiOutlinePieChart />,
    },
    {
      label: "الطلاب ",
      to: `/projects/${projectId}/${archiveName}/students`,
      icon: <AiOutlinePieChart />,
    },
    {
      label: "الخصومات",
      to: `/projects/${projectId}/${archiveName}/discounts`,
      icon: <AiOutlinePieChart />,
    },
    {
      label: "الرواتب",
      to: `/projects/${projectId}/${archiveName}/salaries`,
      icon: <AiOutlinePieChart />,
    },
  ];
  return user.role === "Admin" ? adminLinks : mangerLinks;
};