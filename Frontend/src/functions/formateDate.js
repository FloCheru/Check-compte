export function formateDate(data) {
  data.forEach((expense) => {
    // expense.date = expense.date.replace(/\//g, "-");
    expense.date = expense.date.split("/").reverse().join("-");
  });
  return data;
}
