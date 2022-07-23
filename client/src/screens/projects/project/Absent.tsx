import { useDate } from "src/hooks/useDate";
import { useAbsentEmployees } from "src/utils/absentEmployee";
import { useStudentsAbsentList_by_level } from "src/utils/absentStudents";

const Absent = () => {
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
                      {students?.map(({ absentStudents, name }) => (
                        <div key={name} className="py-5">
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

export default Absent;
