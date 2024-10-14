import DataDisplayer from "./DataDisplayer";
import { remainingExpenses } from "./functions/handleExpenses";

function RemainingExpenses({ fullAccountData, notionData }) {
  const [remainingAccount, remainingNotion] = remainingExpenses(
    fullAccountData,
    notionData
  );

  return (
    <div className="flex gap-40">
      <DataDisplayer
        title={"Restant compte"}
        data={remainingAccount}
        expensesColumnName={"Debit"}
        datesColumnName={"Date operation"}
      />
      <DataDisplayer
        title={"Restant notion"}
        data={remainingNotion}
        expensesColumnName={"Montant"}
        datesColumnName={"Date"}
      />
    </div>
  );
}

export default RemainingExpenses;
