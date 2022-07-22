import { useDate } from "src/hooks/useDate";
import { useAbsentEmployees } from "src/utils/absentEmployee";

const Absent = () => {
  const { defultDate, selectDate, setSelectDate, format } = useDate();

  const { absentEmployees } = useAbsentEmployees(selectDate);

  return (
    <div className="p-5">
      <input
        type="date"
        onChange={(e) => setSelectDate(format(e.target.value))}
        defaultValue={defultDate}
        required
      />
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
      <p className="my-5 text-red-800 ">غياب الطلاب:</p>
    </div>
  );
};

export default Absent;
