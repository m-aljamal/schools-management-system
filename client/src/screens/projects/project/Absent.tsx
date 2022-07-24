import { Link } from "react-router-dom";
import { useUrlParams } from "src/context/auth-context";
import { useDate } from "src/hooks/useDate";
import {
  useAbsentEmployees,
  useTotalAbsentEmployee,
} from "src/utils/absentEmployee";
import {
  useStudentsAbsentList_by_level,
  useTotalStudentAbsent,
} from "src/utils/absentStudents";

const Absent = () => {
  return (
    <div className="px-4">
      <AbsentByDate />
      <TotalAbsent />
    </div>
  );
};

export default Absent;

const TotalAbsent = () => {
  const { totalAbsentEmployees } = useTotalAbsentEmployee();
  const { totalAbsentStudents } = useTotalStudentAbsent();
  const { archiveId, projectId } = useUrlParams();
  return (
    <div>
      <h1 className="text-red-500 p-5">عدد الغياب:</h1>
      <p className="text-blue-700 mb-5">الموظفين: </p>
      <div className="grid grid-cols-3 gap-4">
        {totalAbsentEmployees.map(({ count, id, name }) => (
          <div key={id} className="bg-gray-300 p-5">
            <Link to={`/projects/${projectId}/${archiveId}/employees/${id}`}>
              <p> الاسم: {name} </p>
            </Link>
            <p>عدد الغياب: {count}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 mb-5 text-blue-700">الطلاب: </p>
      <div className="grid grid-cols-3 gap-4">
        {totalAbsentStudents.map(({ count, id, name }) => (
          <div key={id} className="bg-gray-300 p-5">
            <Link to={`/projects/${projectId}/${archiveId}/students/${id}`}>
              <p> الاسم: {name}</p>
            </Link>
            <p>عدد الغياب: {count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const AbsentByDate = () => {
  const { defultDate, selectDate, setSelectDate, format } = useDate();

  const { absentEmployees } = useAbsentEmployees(selectDate);
  const { studentAbsent } = useStudentsAbsentList_by_level(selectDate);
  const { projectId, archiveId } = useUrlParams();
  return (
    <div className="p-5">
      <input
        type="date"
        onChange={(e) => setSelectDate(format(e.target.value))}
        defaultValue={defultDate}
        required
      />
      <div>
        <p className="my-5 text-red-800 ">غياب الموظفين:</p>
        <div className="grid grid-cols-3 gap-5">
          {absentEmployees.map(({ approved, date, employee, id }) => (
            <div key={id} className="bg-gray-200 p-2 ">
              <Link
                to={`/projects/${projectId}/${archiveId}/employees/${employee.id}`}
              >
                <p>الاسم: {employee.name}</p>
              </Link>
              <p> مبرر: {approved ? "نعم" : "لا"}</p>
              <p>التاريخ: {new Date(date).toDateString()}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="my-5 text-red-800 ">غياب الطلاب:</p>
        <div className="grid grid-cols-3 gap-5">
          {studentAbsent.map(({ id, name, divisions }) => (
            <div key={id} className="bg-gray-200 ">
              <p>الصف: {name}</p>
              <div>
                {divisions?.map(({ id, name, students }) => (
                  <div key={id} className="">
                    <p>الشعبة: {name}</p>
                    <div className="grid grid-cols-2 ">
                      {students?.map(({ absentStudents, name, id }) => (
                        <div key={id} className="py-5">
                          <p>الاسم: {name}</p>
                          <p>
                            التاريخ:
                            {new Date(
                              absentStudents[0].date
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
