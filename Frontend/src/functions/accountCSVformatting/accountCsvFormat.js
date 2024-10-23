//Pour le parsing csv to json
import Papa from "papaparse";
//Pour le renommage des names des dépenses
import { renameAccountExpenses } from "./renameAccountExpenses";
//Pour ajouter le paiement
import { paiementSetting } from "./paiementSetting";
//Pour mettre les dates au bon format
import { formateDate } from "./formateDate";
//Pour ajouter le mois
import { monthSetting } from "./monthSetting";

export async function accountCsvFormat(csvFile) {
  //Rennomage des colonnes problématiques);
  const columnMapping = {
    Transports: "Trains, avions et ferrys",
    Energie: "Energie eau, gaz, electricite, fioul",
    Expo: "Expo, musee, cinema",
    Sport: "Sport, Gym et Equipement",
    Musique: "Video, Musique et jeux",
  };
  for (const [key, value] of Object.entries(columnMapping)) {
    const regex = new RegExp(value, "g"); // Crée une expression régulière pour remplacer toutes les occurrences
    csvFile = csvFile.replace(regex, key);
  }
  //Conversion du csv en json
  let parsedData = await new Promise((resolve, reject) => {
    Papa.parse(csvFile, {
      header: true, // Prend la première ligne comme en-têtes
      dynamicTyping: true, // Convertit les types automatiquement
      complete: (result) => {
        resolve(result.data);
      },
      error: (error) => {
        console.error("Erreur lors du parsing:", error);
        reject(error);
      },
    });
  });
  //suppression du dernier élément (qui est vide par défaut dans l'export account)
  const lastElementDeletedData = parsedData.filter(
    (expense) => expense["Date de comptabilisation"] !== null //le dernier élément est sous la forme {"Date de comptabilisation": null}
  );
  // //suppression des prélèvement débit différé
  // data = data.filter(
  //   (dataKey) => !dataKey["Libelle simplifie"].includes("DEBIT")
  // );

  //Setting de "paiement"
  const paiementSetData = paiementSetting(lastElementDeletedData);

  paiementSetData.forEach((dataKey) => {
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
  paiementSetData.forEach((entry, index) => {
    const newEntry = {};
    Object.keys(entry).forEach((key) => {
      const newKey = keyMapping[key] || key; // Utilise la clé originale si elle n'est pas dans keyMapping
      newEntry[newKey] = entry[key];
    });
    paiementSetData[index] = newEntry; // Remplace l'ancien objet par le nouvel objet
  });

  //ajout des clés manquantes pour la db
  paiementSetData.forEach((entry, index) => {
    entry["catégorie"] = null;
    entry["réglé"] = true;
    entry["type"] = "Dépenses";
    entry["maPart"] = null;
    entry["tricount"] = null;
  });

  const renamedData = renameAccountExpenses(paiementSetData);
  const dateFormattedData = formateDate(renamedData);
  const monthSetData = monthSetting(dateFormattedData);
  console.log(monthSetData);
  return monthSetData;
}