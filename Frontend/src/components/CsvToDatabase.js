import React, { useState, useEffect } from "react";
//pour le formattage du Csv account
import { accountCsvFormat } from "../functions/accountCsvFormat";
//pour requete serveur, ajouter les données dans la db
import { addDataToDatabase } from "../functions/addDataToDatabase";

function CsvToDatabase() {
  const [csvFile, setCsvFile] = useState(null); // Pour stocker le fichier csv

  //formatter et détecter vers quelle table envoyer les données
  const handleFileLoading = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCsvFile(accountCsvFormat(e.target.result));
      };
      reader.readAsText(file);
    }
  };
  //Appel de addDataToDatabase quand csvFile est mis à jour
  useEffect(() => {
    if (csvFile) {
      //requête serveur pour envoyer les données dans la db
      addDataToDatabase(csvFile, "account");
    }
  }, [csvFile]);

  return (
    <div className="border-solid border-2 border-s-slate-600">
      <input
        type="file"
        multiple
        accept=".csv"
        id="full-account"
        onChange={handleFileLoading}
      />
      <button>Upload</button>
    </div>
  );
}

export default CsvToDatabase;
