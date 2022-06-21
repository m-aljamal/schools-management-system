import React from "react";
import { useParams } from "react-router-dom";
import { useEmployee } from "src/utils/employees";

const Employee = () => {
  const { employee } = useEmployee();
  return (
    <div>
      <p>{employee?.name}</p>
    </div>
  );
};

export default Employee;
