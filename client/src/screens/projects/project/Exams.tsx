import { useExam } from "src/utils/exam";
import { useSemesterList } from "src/utils/semester";

const Exams = () => {
  const { semesters } = useSemesterList();

  return (
    <div className="p-5">
      <h1>الامتحانات:</h1>
      <div>
        {semesters.map(({ id, name }) => (
          <div key={id} className="bg-gray-100 my-5 p-5">
            <h2>{name}</h2>
            <h2>النتائج</h2>
            <Result semesterId={id} />
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default Exams;

const Result = ({ semesterId }: { semesterId: string }) => {
  const { exams } = useExam(semesterId);

  return (
    <div>
      {exams.map(({ id, level, semesterId, grades }) => (
        <div key={id}>
          <h3>الصف: {level.name}</h3>
          <div>
            {grades?.map(
              ({
                id,
                subject,
                final_grade,
                first_quiz_grade,
                homework_grade,
                student,
                oral_grade,
                second_quiz_grade,
              }) => (
                <div key={id} className="bg-green-200 my-4 p-5">
                  <p>اسم الطالب: {student.name}</p>
                  <p>المادة: {subject.name}</p>
                  <p>مذاكرة اولى: {first_quiz_grade}</p>
                  <p>مذاكرة ثانية: {second_quiz_grade}</p>
                  <p>الوظائف: {homework_grade}</p>
                  <p> شفهي: {oral_grade}</p>
                  <p> الامتحان النهائي: {final_grade}</p>
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
