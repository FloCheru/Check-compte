import React, { useState, useEffect } from "react";
import CsvToJson from "./components/Csvtojson";
import DataDisplayer from "./components/DataDisplayer";
import RemainingExpenses from "./components/RemainingExpenses";
// import { getFilteredPages } from "./functions/apiNotion";

function App() {
  const [accountData, setAccountData] = useState(null);
  const [notionData, setNotionData] = useState(null);
  const [fullAccountData, setFullAccountData] = useState(null);

  return (
    <div className="flex flex-col h-full">
      <CsvToJson
        setAccountData={setAccountData}
        setFullAccountData={setFullAccountData}
        setNotionData={setNotionData}
      />
      <div className="flex gap-40">
        <DataDisplayer
          title={"Full account"}
          data={fullAccountData}
          expensesColumnName={"Debit"}
          datesColumnName={"Date operation"}
        />
        <DataDisplayer
          title={"Full notion"}
          data={notionData}
          expensesColumnName={"Montant"}
          datesColumnName={"Date"}
        />
        <RemainingExpenses
          fullAccountData={fullAccountData}
          notionData={notionData}
        />
      </div>
    </div>
  );
}
export default App;
