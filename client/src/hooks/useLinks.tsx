import { AiOutlinePieChart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useAuth, useUrlParams } from "src/context/auth-context";
import { Role } from "src/generated/generates";

export const useProjectLinks = () => {
  const { archiveId, projectId } = useUrlParams();
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
      to: `/projects/${projectId}/${archiveId}`,
      icon: <AiOutlinePieChart />,
    },
    {
      label: "الصفوف",
      to: `/projects/${projectId}/${archiveId}/levels`,
      icon: <AiOutlinePieChart />,
    },

    {
      label: "الموظفين ",
      to: `/projects/${projectId}/${archiveId}/employees`,
      icon: <AiOutlinePieChart />,
    },
    {
      label: "المواد",
      to: `/projects/${projectId}/${archiveId}/subjects`,
      icon: <AiOutlinePieChart />,
    },
    {
      label: "الطلاب ",
      to: `/projects/${projectId}/${archiveId}/students`,
      icon: <AiOutlinePieChart />,
    },
    {
      label: "الغياب ",
      to: `/projects/${projectId}/${archiveId}/absent`,
      icon: <AiOutlinePieChart />,
    },
    {
      label: "الامتحانات",
      to: `/projects/${projectId}/${archiveId}/exams`,
      icon: <AiOutlinePieChart />,
    },
    {
      label: "الخصومات",
      to: `/projects/${projectId}/${archiveId}/discounts`,
      icon: <AiOutlinePieChart />,
    },
    {
      label: "الرواتب",
      to: `/projects/${projectId}/${archiveId}/salaries`,
      icon: <AiOutlinePieChart />,
    },
    {
      label: "الارشيف",
      to: `/projects/${projectId}/${archiveId}/archives`,
      icon: <AiOutlinePieChart />,
    },
  ];

  const teacherLinks = [
    {
      label: "الرئيسية",
      to: `/project/${archiveId}`,
      icon: <AiOutlinePieChart />,
    },
    {
      label: "الطلاب ",
      to: `/project/${archiveId}/students`,
      icon: <AiOutlinePieChart />,
    },
  ];

  const studentLinks = [
    {
      label: "الرئيسية",
      to: `/project/${archiveId}`,
      icon: <AiOutlinePieChart />,
    },
    {
      label: "المواد",
      to: `/project/${archiveId}/subjects`,
      icon: <AiOutlinePieChart />,
    },
  ];
  switch (user.role) {
    case Role.Admin:
      return adminLinks;
    case Role.DataEntry:
    case Role.EducationSupervisor:
    case Role.Principal:
      return mangerLinks;
    case Role.Teacher:
      return teacherLinks;
    case Role.Student:
      return studentLinks;
    default:
      return [];
  }
};
