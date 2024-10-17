export function addDataToNotion(data) {
  fetch("http://localhost:4000/submitFormToNotion", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      montant: data.montant,
      catégorie: data.catégorie,
      réglé: data.réglé,
      select: data.select,
      tricount: data.tricount,
      mois: data.mois,
      date: data.date,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success! ", data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}
