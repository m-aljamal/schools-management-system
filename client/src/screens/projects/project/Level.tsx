import React from "react";
import CreateDivision from "src/components/CreateDivision";
import { useUrlParams } from "src/context/auth-context";
import { useDivisionsList } from "src/utils/division";
import { useFindLevel } from "src/utils/levels";
import { useSubjectsList } from "src/utils/subject";
const Level = () => {
  const { level } = useFindLevel();
  return (
    <div className="p-5 ">
      <p className="text-red-500 font-bold">{level?.name}</p>
      <Divisions />
      <Subjects />
      <p>الطلاب</p>
      <p>المدرسين</p>
      <p>الامتحانات</p>
    </div>
  );
};

export default Level;

const Divisions = () => {
  const { divisions } = useDivisionsList();

  return (
    <div className="p-2 ">
      <p>الشعب:</p>
      <div className="bg-gray-100 p-5">
        <CreateDivision />
        {divisions.map(({ id, name }) => (
          <div key={id}>
            <p>{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Subjects = () => {
  const { subjects } = useSubjectsList();
  return (
    <div className="p-2 ">
      <p>المواد:</p>
      <div className="bg-gray-100 p-5">
        {subjects.map(({ id, name }) => (
          <div key={id}>
            <p>{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
