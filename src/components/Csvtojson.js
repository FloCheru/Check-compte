import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import {
  accountDataFormat,
  accountFileColumn,
} from "../functions/accountDataFormat";
import { sortExpenses } from "../functions/handleExpenses";

function CsvToJson({ setAccountData, setFullAccountData, setNotionData }) {
  const [csvFile, setCsvFile] = useState(null);
  const [fileId, setFileId] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCsvFile(accountFileColumn(e.target.result));
        setFileId(event.target.id);
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    if (csvFile) {
      Papa.parse(csvFile, {
        header: true, // Prend la première ligne comme en-têtes
        dynamicTyping: true, // Convertit les types automatiquement
        complete: (result) => {
          switch (fileId) {
            case "account":
              setAccountData(
                sortExpenses(accountDataFormat(result.data), "Debit")
              );
              break;
            case "full-account":
              setFullAccountData(
                sortExpenses(accountDataFormat(result.data), "Debit")
              );
              break;
            default:
              setNotionData(sortExpenses(result.data, "Montant"));
          }
        },
        error: (error) => {
          console.error("Erreur lors du parsing:", error);
        },
      });
    }
  }, [csvFile]);

  return (
    <div className="flex">
      <div>
        <h2>CSV full account</h2>
        <input
          type="file"
          multiple
          accept=".csv"
          id="full-account"
          onChange={handleFileUpload}
        />
      </div>
      <div>
        <h2>Notion account</h2>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          id="notion"
        />
      </div>
    </div>
  );
}

export default CsvToJson;