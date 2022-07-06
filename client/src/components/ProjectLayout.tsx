import { Link, Outlet, useParams } from "react-router-dom";
import { useUrlParams } from "src/context/auth-context";

const ProjectLayout = () => {
  const { archiveId, projectId } = useUrlParams();
  const projectLinks = [
    {
      label: "الرئيسية",
      to: `/projects/${projectId}/${archiveId}`,
      icon: "📦",
    },

    {
      label: "الموظفين ",
      to: `/projects/${projectId}/${archiveId}/employees`,
      icon: "📦",
    },
    {
      label: "الطلاب ",
      to: `/projects/${projectId}/${archiveId}/students`,
      icon: "📦",
    },
    {
      label: "الخصومات",
      to: `/projects/${projectId}/${archiveId}/discounts`,
      icon: "📦",
    },
    {
      label: "الرواتب",
      to: `/projects/${projectId}/${archiveId}/salaries`,
      icon: "📦",
    },
    {
      label: "الارشيف",
      to: `/projects/${projectId}/${archiveId}/archives`,
      icon: "📦",
    },
  ];
  return (
    <div>
      <div>
        <ul className="flex gap-8 bg-gray-400 p-2">
          {projectLinks.map((link) => (
            <li key={link.label}>
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default ProjectLayout;
