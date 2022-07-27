import React from "react";
import { useUrlParams } from "src/context/auth-context";
import { useGradeList_by_subject } from "src/utils/exam";
import { useSemesterList } from "src/utils/semester";

const Exam = () => {
  const { semesters } = useSemesterList();
  return (
    <div className="p-5">
      <h1>الامتحانات:</h1>
      {semesters.map(({ id, name }) => (
        <div key={id}>
          <h2 className="bg-gray-300">{name}</h2>
          <MarkesList semesterId={id} />
        </div>
      ))}
    </div>
  );
};

export default Exam;

const MarkesList = ({ semesterId }: { semesterId: string }) => {
  const { levelId } = useUrlParams();
  const { subject } = useGradeList_by_subject({ semesterId, levelId });
  return (
    <div>
      <h2>النتائج</h2>
      {subject.map(({ grades, id, name }) => (
        <div key={id}>
          <h3>{name}</h3>
          <div className="grid grid-cols-3 gap-5">
            {grades.map(
              ({
                id,
                semester,
                student,
                final_grade,
                first_quiz_grade,
                homework_grade,
                oral_grade,
                second_quiz_grade,
              }) => (
                <div key={id}>
                  <div key={id} className="bg-green-200 my-4 p-5">
                    <p>اسم الطالب: {student.name}</p>
                    <p>مذاكرة اولى: {first_quiz_grade}</p>
                    <p>مذاكرة ثانية: {second_quiz_grade}</p>
                    <p>الوظائف: {homework_grade}</p>
                    <p> شفهي: {oral_grade}</p>
                    <p> الامتحان النهائي: {final_grade}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
