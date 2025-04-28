export const months = [
  { value: "", label: "All Months" },
  { value: 0, label: "January" },
  { value: 1, label: "February" },
  { value: 2, label: "March" },
  { value: 3, label: "April" },
  { value: 4, label: "May" },
  { value: 5, label: "June" },
  { value: 6, label: "July" },
  { value: 7, label: "August" },
  { value: 8, label: "September" },
  { value: 9, label: "October" },
  { value: 10, label: "November" },
  { value: 11, label: "December" }
];

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

export const getMonthFromDate = (dateString) => {
  return new Date(dateString).getMonth();
};

export const calculateDays = (startDate, endDate) => {
  return Math.ceil(
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
  );
};

export const filterByMonth = (items, monthValue, dateField = 'startDate') => {
  if (monthValue === "") return items;
  return items.filter(item => {
    const date = new Date(item[dateField]);
    return date.getMonth() === parseInt(monthValue);
  });
};

export const isDateInMonth = (dateString, monthValue) => {
  const date = new Date(dateString);
  return date.getMonth() === monthValue;
}; 