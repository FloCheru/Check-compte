//Pour le parsing csv to json
import Papa from "papaparse";

export function accountCsvFormat(csvFile) {
  let parsedData;
  //Conversion du csv en json
  Papa.parse(csvFile, {
    header: true, // Prend la première ligne comme en-têtes
    dynamicTyping: true, // Convertit les types automatiquement
    complete: (result) => {
      // setAccountData(sortExpenses(accountCsvFormat(result.data), "Debit"));
      parsedData = result.data;
    },
    error: (error) => {
      console.error("Erreur lors du parsing:", error);
    },
  });

  //suppression du dernier élément (qui est vide par défaut dans l'export account)
  console.log(parsedData);
  parsedData = parsedData.filter(
    (expense) => expense["Date de comptabilisation"] !== null //le dernier élément est sous la forme {"Date de comptabilisation": null}
  );
  console.log(parsedData);
  // //suppression des prélèvement débit différé
  // data = data.filter(
  //   (dataKey) => !dataKey["Libelle simplifie"].includes("DEBIT")
  // );
  parsedData.forEach((dataKey) => {
    //Conversion en number et fusion débit-crédit
    if (dataKey.Credit) dataKey.Debit = dataKey.Credit;
    dataKey.Debit = parseFloat(dataKey.Debit);

    //Suppression des keys inutiles
    const uselessKeys = [
      "Libelle operation",
      "Reference",
      "Informations complementaires",
      "Type operation",
      "Categorie",
      "Sous categorie",
      "Date de valeur",
      "Pointage operation",
      "Date de comptabilisation",
      "Credit",
    ];
    uselessKeys.forEach((keyToDelete) => {
      delete dataKey[keyToDelete];
    });
  });

  //Renommage des keys
  const keyMapping = {
    "Date operation": "date",
    "Libelle simplifie": "name",
    Debit: "montant",
  };
  parsedData.forEach((entry, index) => {
    const newEntry = {};
    Object.keys(entry).forEach((key) => {
      const newKey = keyMapping[key] || key; // Utilise la clé originale si elle n'est pas dans keyMapping
      newEntry[newKey] = entry[key];
    });
    parsedData[index] = newEntry; // Remplace l'ancien objet par le nouvel objet
  });

  //ajout des clés manquantes pour la db
  parsedData.forEach((entry, index) => {
    entry["catégorie"] = null;
    entry["réglé"] = "Oui";
    entry["type"] = "Dépenses";
    entry["maPart"] = null;
    entry["tricount"] = "";
    entry["mois"] = "Septembre";
    entry["paiement"] = "Débit 04/10/24";
  });

  return parsedData;
}

export function accountFileColumn(fileTxt) {
  // Remplacer les chaînes problématiques avant de parser
  fileTxt = fileTxt
    .replace(/Energie eau, gaz, electricite, fioul/g, "Energie")
    .replace(/Expo, musee, cinema/g, "Expo")
    .replace(/Trains, avions et ferrys/g, "Trains")
    .replace(/Sport, Gym et Equipement/g, "Sport")
    .replace(/Video, Musique et jeux/g, "Musique");

  return fileTxt;
}
