import { useGradeList_by_subject } from "src/utils/exam";
import { useSemesterList } from "src/utils/semester";

const Exams = () => {
  const { semesters } = useSemesterList();
 
  return (
    <div className="p-5">
      exams
      <h1>الامتحانات:</h1>
      <div>
        {semesters.map(({ id, name }) => (
          <div key={id} className="bg-gray-100 my-5 p-5">
            <h2>{name}</h2>
           
            <Result semesterId={id} />
          </div>
        ))}
      </div>
     </div>
  );
};

export default Exams;

const Result = ({ semesterId }: { semesterId: string }) => {
   
  const t = useGradeList_by_subject({ semesterId });
 
  return <div>ddd</div>;
};

// <div key={id} className="bg-green-200 my-4 p-5">
//   <p>اسم الطالب: {student.name}</p>
//   <p>المادة: {subject.name}</p>
//   <p>مذاكرة اولى: {first_quiz_grade}</p>
//   <p>مذاكرة ثانية: {second_quiz_grade}</p>
//   <p>الوظائف: {homework_grade}</p>
//   <p> شفهي: {oral_grade}</p>
//   <p> الامتحان النهائي: {final_grade}</p>
// </div>
