import { Link, useMatch, useParams } from "react-router-dom";

interface ILink {
  link: {
    label: string;
    to: string;
    // icon: JSX.Element;
    icon: string;
  };
}

function NavLink({ link }: ILink) {
  const match = useMatch(link.to);
  return (
    <Link
      to={link.to}
      className={` hover:bg-gray-700 hover:text-white hover:rounded-md flex items-center pr-4 transition duration-300   ${
        match ? "bg-gray-700 rounded-md text-white" : "text-gray-400"
      }`}
    >
      <div className="flex gap-4 py-3">
        <span className="text-2xl ">{link.icon}</span>
        {link.label}
      </div>
    </Link>
  );
}

const adminLinks = [
  {
    to: "/",
    label: "لوحة التحكم",
    icon: "📦",
  },
  {
    to: "/projects",
    label: "المشاريع",
    icon: "📦",
  },
];

function Nav() {
  const links = adminLinks;

  return (
    <nav>
      <ul className=" space-y-4">
        {links?.map((link) => (
          <li key={link.label}>
            <NavLink link={link} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
