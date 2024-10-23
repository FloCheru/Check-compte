export function monthSetting(data) {
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  data.forEach((entry, index) => {
    entry["mois"] = months[Number(entry.date.split("-")[1]) - 1]; //On récupère le numéro du mois à partir de date
  });
  return data;
}
