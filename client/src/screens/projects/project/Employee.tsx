import React from "react";
import { useParams } from "react-router-dom";

const Employee = () => {
  const { employeeId } = useParams();
  return (
    <div>
      Employee id
      <p>{employeeId}</p>
    </div>
  );
};

export default Employee;
