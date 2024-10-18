export function cleanAccountCSVcolumns(fileTxt) {
  // Remplacer les chaînes problématiques avant de parser
  fileTxt = fileTxt
    .replace(/Energie eau, gaz, electricite, fioul/g, "Energie")
    .replace(/Expo, musee, cinema/g, "Expo")
    .replace(/Trains, avions et ferrys/g, "Trains")
    .replace(/Sport, Gym et Equipement/g, "Sport")
    .replace(/Video, Musique et jeux/g, "Musique");

  return fileTxt;
}
