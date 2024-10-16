export function accountDataFormat(data) {
  //suppression du dernier élément (vide)
  delete data[Object.keys(data)[Object.keys(data).length - 1]];
  //suppression des prélèvement débit différé
  data = data.filter(
    (dataKey) => !dataKey["Libelle simplifie"].includes("DEBIT")
  );
  data.forEach((dataKey) => {
    //Conversion en number et fusion débit-crédit
    if (dataKey.Credit) dataKey.Debit = dataKey.Credit;
    dataKey.Debit = parseFloat(dataKey.Debit);
    //Suppression des colonnes inutiles
    const uselessKeys = [
      "Libelle operation",
      "Reference",
      "Informations complementaires",
      "Type operation",
      "Categorie",
      "Sous categorie",
      "Date de valeur",
      "Pointage operation",
    ];
    uselessKeys.forEach((keyToDelete) => {
      delete dataKey[keyToDelete];
    });
  });
  //supression des doublons
  console.log(data);
  const testUniqueData = {};
  const uniqueData = [];
  data.forEach((entry) => {
    const key = `${entry["Date operation"]}_${entry["Debit"]}}`;
    if (!testUniqueData[key]) {
      testUniqueData[key] = true;
      uniqueData.push(entry);
    }
  });

  console.log(uniqueData);

  return uniqueData;
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
