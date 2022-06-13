import { Link, Outlet, useParams } from "react-router-dom";

const ProjectLayout = () => {
  const { projectId, archiveId } = useParams();
console.log(projectId, archiveId);

  const projectLinks = [
    {
      label: "الرئيسية",
      to: `/projects/${projectId}/${archiveId}`,
      icon: "📦",
    },

    {
      label: "الموظفين ",
      to: `/projects/${projectId}/employees/${archiveId}`,
      icon: "📦",
    },
    {
      label: "الطلاب ",
      to: `/projects/${projectId}/students`,
      icon: "📦",
    },
    {
      label: "الخصومات",
      to: `/projects/${projectId}/discounts`,
      icon: "📦",
    },
    {
      label: "الرواتب",
      to: `/projects/${projectId}/salaries`,
      icon: "📦",
    },
    {
      label: "الارشيف",
      to: `/projects/${projectId}/archives`,
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
