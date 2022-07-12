import React from "react";
import { useSemesterList } from "src/utils/semester";

const Exams = () => {
  const { semesters } = useSemesterList();
  const [semesterId, setSemesterId] = React.useState("");
  return (
    <div>
      <h1>Exams</h1>
      <div>
        {semesters.map((semester) => (
          <div key={semester.id}>
            <h2>{semester.name}</h2>
          </div>
        ))}
      </div>
      <div>
        <h2>النتائج</h2>
      </div>
    </div>
  );
};

export default Exams;
