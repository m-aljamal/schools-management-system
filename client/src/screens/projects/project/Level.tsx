import { Link } from "react-router-dom";
import CreateDivision from "src/components/CreateDivision";
import { useUrlParams } from "src/context/auth-context";
import { useAbsentEmployeesByLevelId } from "src/utils/absentEmployee";
import { useDivisionsList } from "src/utils/division";
import { useTeachersList_divisions } from "src/utils/employees";
import { useExamsList_level } from "src/utils/exam";
import { useFindLevel } from "src/utils/levels";
import { useStudentsList_divisionList_byLevel } from "src/utils/student";
import { useSubjectsList } from "src/utils/subject";
import { useDate } from "src/hooks/useDate";
import { useStudentAbsentLevel } from "src/utils/absentStudents";
const Level = () => {
  const { level } = useFindLevel();
  return (
    <div className="p-5 ">
      <p className="text-red-500 font-bold">{level?.name}</p>
      <Divisions />
      <Subjects />
      <Students />
      <Teachers />
      <ExamsList />
      <EmployeeAbsent />
      <StudentAbsent />
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
            <p>{id}</p>
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
            <p>{id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Students = () => {
  const { divisions } = useStudentsList_divisionList_byLevel();
  const { projectId, archiveId } = useUrlParams();
  return (
    <div className="p-2 ">
      <p>الطلاب:</p>
      <div className="bg-gray-100 p-5">
        {divisions.map(({ id, name, students }) => (
          <div key={id}>
            <p className="text-green-800">{name}</p>
            <div className="p-5">
              {students?.map(({ name, id }) => (
                <div key={id}>
                  <Link
                    to={`/projects/${projectId}/${archiveId}/students/${id}`}
                  >
                    <p>{name}</p>
                    <p>{id}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Teachers = () => {
  const { teachers } = useTeachersList_divisions();
  const { projectId, archiveId } = useUrlParams();
  return (
    <div className="p-2 ">
      <p>المدرسين:</p>
      <div className="bg-gray-100 p-5">
        {teachers.map(({ id, name, divisions }) => (
          <div key={id}>
            <Link to={`/projects/${projectId}/${archiveId}/employees/${id}`}>
              <p className="text-green-800">{name}</p>
              <p>{id}</p>
            </Link>
            <div className="p-5">
              {divisions?.map(({ id, name }) => (
                <p key={id}>{name}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ExamsList = () => {
  const { exams } = useExamsList_level();
  return (
    <div className="p-2 ">
      <p>الامتحانات:</p>
      <div className="bg-gray-100 p-5">
        {exams.map(({ id, level, semester, grades }) => (
          <div key={id} className=" p-5">
            <p className="text-green-800">{level.name}</p>
            <p>{semester.name}</p>
            <div className=" grid grid-cols-3 gap-5">
              {grades?.map(
                ({
                  id,
                  student,
                  subject,
                  final_grade,
                  first_quiz_grade,
                  homework_grade,
                  oral_grade,
                  second_quiz_grade,
                }) => (
                  <div key={id}>
                    <p>اسم الطالب: {student.name}</p>
                    <p>المادة: {subject.name}</p>
                    <p>المذاكرة الاولى: {first_quiz_grade}</p>
                    <p>المذاكرة الثانية: {second_quiz_grade}</p>
                    <p>درجة الواجبات: {homework_grade}</p>
                    <p>الامتحان الشفهي: {oral_grade}</p>
                    <p>درجة الامتحان: {final_grade}</p>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EmployeeAbsent = () => {
  const { today } = useDate();
  const { absentEmployees } = useAbsentEmployeesByLevelId(today);

  return (
    <div>
      <p>الغياب اليوم</p>
      المدرسين:
      <div className="grid grid-cols-3 gap-4">
        {absentEmployees.map(({ approved, date, employee, id }) => (
          <div key={id} className="bg-gray-200 p-5 m-2">
            <p> التاريخ :{new Date(date).toLocaleDateString()}</p>
            <p>الاسم: {employee.name}</p>
            {/* <p>الصف: {employee.levels[0].name}</p> */}
            <p>مبرر: {approved ? "نعم" : "لا"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const StudentAbsent = () => {
  const { today } = useDate();
  const { studentAbsent } = useStudentAbsentLevel(today);
  return (
    <div>
      <p>غياب الطلاب</p>
      <div className="grid grid-cols-3 gap-4">
        {studentAbsent.map(({ approved, id, student, date }) => (
          <div key={id} className="bg-gray-200 p-5 m-2">
            <p>الاسم: {student.name}</p>
            <p>{approved ? "نعم" : "لا"}</p>
            <p> التاريخ :{new Date(date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
