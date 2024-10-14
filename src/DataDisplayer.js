function DataDisplayer({ title, data, expensesColumnName, datesColumnName }) {
  return (
    <div>
      {data && (
        <div>
          <h1>{title}</h1>
          {data.map((expense, i) => (
            <div key={i} className="flex">
              {title.includes("Restant") && <input type="checkbox" />}
              <p>
                {expense[`${datesColumnName}`]}{" "}
                {expense[`${expensesColumnName}`]}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DataDisplayer;
