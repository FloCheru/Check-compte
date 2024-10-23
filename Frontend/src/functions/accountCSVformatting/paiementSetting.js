export function paiementSetting(data) {
  console.log(data[data.length - 1]["Date de comptabilisation"]);
  const monthNumber =
    data[data.length - 1]["Date de comptabilisation"].split("/")[1];
  const dataOperationTypes = data.map((entry) => entry["Type operation"]);
  //     entry["paiement"] = entry["paiement"].replace(/ /g, "");
  const paiement = dataOperationTypes.some(
    (operationTypes) => operationTypes !== "Carte bancaire"
  )
    ? "compte"
    : `débit 04/${monthNumber}/24`;
  data.forEach((expense) => (expense["paiement"] = paiement));
  //   console.log(data);

  return data;
}
