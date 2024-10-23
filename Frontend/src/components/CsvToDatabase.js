import React, { useState, useEffect } from "react";
//pour le formattage du Csv account
import { accountCsvFormat } from "../functions/accountCSVformatting/accountCsvFormat";
//pour requete serveur, ajouter les données dans la db
import { addDataToMySQLDatabase } from "../functions/addDataToMySQLDatabase";
//pour les boutons normalisés
import { Button } from "./atoms/Button";
import { addDataToNotion } from "../functions/addDataToNotion";

function CsvToDatabase() {
  const [dataToAdd, setDataToAdd] = useState(null); // Pour stocker les données à ajouter dans la db

  //formatter et détecter vers quelle table envoyer les données
  const handleFileLoading = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        //async car attente de formattedData (due au parsing des données dans accountCsvFormat)
        try {
          //
          const formattedData = await accountCsvFormat(e.target.result);
          setDataToAdd(formattedData);
        } catch (error) {
          console.error("Erreur lors du formattage du csv:", error);
        }
      };
      reader.readAsText(file);
    }
  };
  const handleExpensesSubmit = () => {
    if (dataToAdd) {
      //requête serveur pour envoyer les données dans la db
      // addDataToMySQLDatabase(dataToAdd, "account");
      addDataToNotion(dataToAdd);
    }
  };

  return (
    <div className="flex flex-col border-solid border-2 border-s-slate-600">
      <input
        type="file"
        multiple
        accept=".csv"
        id="file-input"
        onChange={handleFileLoading}
      />
      {dataToAdd && (
        <div>
          <h2>Expenses to be added in database</h2>
          <div className="flex items-start">
            <table>
              <thead>
                <tr>
                  {Object.keys(dataToAdd[0]).map((key, i) => (
                    <th key={i}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataToAdd.map((expense, i) => (
                  <tr key={i}>
                    {Object.values(expense).map((entry, j) => (
                      <td
                        key={j}
                        className="p-2 border-solid border-2 border-s-slate-600"
                      >
                        {entry}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <Button
              text="Upload into dataBase"
              onClick={handleExpensesSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CsvToDatabase;
