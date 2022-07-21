import React, { useState } from "react";
import { today } from "src/utils/absentDateFormat";
import { useAbsentEmployees } from "src/utils/absentEmployee";

const Absent = () => {
  const date = today();
  const [selectDate, setSelectDate] = useState(date)
  const { absentEmployees } = useAbsentEmployees(selectDate);
console.log(selectDate);

  return (
    <div className="p-5">
      <input type='date' onChange={(e)=>setSelectDate(e.target.value)} />
      <p>غياب الموظفين:</p>
      {absentEmployees.map(({ approved, date, employee, id }) => (
        <div key={id}>
          <p>الاسم: {employee.name}</p>
          <p> مبرر: {approved ? "نعم" : "لا"}</p>
          <p>التاريخ: {new Date(date).toDateString()}</p>
        </div>
      ))}
      <p>غياب الطلاب:</p>
    </div>
  );
};

export default Absent;
