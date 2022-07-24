import { Role } from "src/generated/generates";
import { useEmployee } from "src/utils/employees";

const EmployeePage = () => {
  const { employee } = useEmployee();

  return (
    <div>
      {employee?.role === Role.Teacher ? (
        <div>
          <p>{employee?.name}</p>
          <p className="grid grid-cols-3">
            {employee.levels?.map(({ id, name, divisions }) => (
              <div>
                <p key={id} className="text-green-700 ">
                  {name}
                </p>
                <div>
                  {divisions?.map(({ id, name }) => (
                    <p className="text-red-700">{name}</p>
                  ))}
                </div>
              </div>
            ))}
          </p>
        </div>
      ) : (
        <div className="p-5">
          <p>{employee?.name}</p>
          <p>{employee?.role}</p>
        </div>
      )}
    </div>
  );
};

export default EmployeePage;
