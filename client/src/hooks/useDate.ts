import React from "react";

const dateTosub = (date = new Date()) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return { month, day, year };
};

export const useDate = () => {
  const { day, month, year } = dateTosub();
  const today = `${month}-${day}-${year}`;
  const [selectDate, setSelectDate] = React.useState(today);
  return {
    today,
    defultDate: new Date().toISOString().split("T")[0],
    selectDate,
    setSelectDate,
    format: (date: string) => {
      const { day, month, year } = dateTosub(new Date(date));
      return `${month}-${day}-${year}`;
    },
  };
};
