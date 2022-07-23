import { useDate } from "src/hooks/useDate";
import {
  useAbsentEmployees,
  useTotalAbsentEmployee,
} from "src/utils/absentEmployee";
import { useStudentsAbsentList_by_level } from "src/utils/absentStudents";

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
  return (
    <div>
      <h1 className="text-red-500 p-5">عدد الغياب:</h1>
      <p>الموظفين: </p>
      <div className="grid grid-cols-3 gap-4">
        {totalAbsentEmployees.map(({ count, id, name }) => (
          <div key={id} className="bg-gray-300 p-5">
            <p> الاسم: {name}</p>
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
              <p>الاسم: {employee.name}</p>
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
