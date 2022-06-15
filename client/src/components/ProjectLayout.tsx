import { Link, Outlet, useParams } from "react-router-dom";

const ProjectLayout = () => {
  const { projectId, archiveName } = useParams();

  const projectLinks = [
    {
      label: "الرئيسية",
      to: `/projects/${projectId}/${archiveName}`,
      icon: "📦",
    },

    {
      label: "الموظفين ",
      to: `/projects/${projectId}/${archiveName}/employees`,
      icon: "📦",
    },
    {
      label: "الطلاب ",
      to: `/projects/${projectId}/${archiveName}/students`,
      icon: "📦",
    },
    {
      label: "الخصومات",
      to: `/projects/${projectId}/${archiveName}/discounts`,
      icon: "📦",
    },
    {
      label: "الرواتب",
      to: `/projects/${projectId}/${archiveName}/salaries`,
      icon: "📦",
    },
    {
      label: "الارشيف",
      to: `/projects/${projectId}/${archiveName}/archives`,
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
