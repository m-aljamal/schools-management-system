import { useStudent } from "src/utils/student";

const Student = () => {
  const { student } = useStudent();

  const levelName = student?.levels.map((level) => level.name);
  const divisionName = student?.levels.map((level) =>
    level.divisions?.map((division) => division.name)
  );

  return (
    <div>
      <h2>الطالب:</h2>
      <p>{student?.name}</p>
      <p>{levelName}</p>
      <p>{divisionName}</p>
    <p>{student?.id}</p>
    </div>
  );
};

export default Student;
