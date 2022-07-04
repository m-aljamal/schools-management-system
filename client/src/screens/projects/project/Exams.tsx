import React from "react";
import { useSemesterList } from "src/utils/semester";

const Exams = () => {
  const { semesters } = useSemesterList();

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
    </div>
  );
};

export default Exams;
