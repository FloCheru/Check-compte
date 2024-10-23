export function renameAccountExpenses(data) {
  const forRenaming = {
    Saladine: ["SLDN CANEBIERE", "SALADIN"],
    Carrefour: "CATALANS DISTRIBUTION",
    Casino: "CASINO",
    Foot: ["LE 13", "OMB 5 FOOT"],
    "Jus catalans": "ZETTLE BALLS",
    Essence: "CERTAS ESSOF039",
    Uber: "UBER TRIP",
    Bar: "BC",
    Lime: ["LIME PAIEMENT N", "LIME 2 COURSES"],
  };
  data.forEach((expense) => {
    Object.keys(forRenaming).forEach((key) => {
      if (forRenaming[key].includes(expense.name)) expense.name = key;
    });
  });
  return data;
}
