import { useState } from "react";

function ExportToNotion() {
  const [name, setName] = useState("Nom");
  const [montant, setMontant] = useState(-63.45);
  const [catégorie, setCatégorie] = useState("Courses 09");
  const [réglé, setRéglé] = useState(true);
  const [select, setSelect] = useState("dépense");
  const [tricount, setTricount] = useState("Non");
  const [mois, setMois] = useState("Septembre");
  const [date, setDate] = useState("2024-09-13");
  fetch("http://localhost:4000/submitFormToNotion", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      montant: montant,
      catégorie: catégorie,
      réglé: réglé,
      select: select,
      tricount: tricount,
      mois: mois,
      date: date,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success! ", data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });

  return (
    <div>
      <p>Name</p>
      <input
        type="text"
        id="name"
        value="Nom"
        onChange={(e) => setName(e.target.value)}
      ></input>
      <p>Montant</p>
      <input
        type="number"
        id="montant"
        value="-63.45"
        onChange={(e) => setMontant(e.target.value)}
      ></input>
      <p>Catégorie</p>
      <input
        type="text"
        id="catégorie"
        value="Courses 09"
        onChange={(e) => setCatégorie(e.target.value)}
      ></input>
      <p>Réglé</p>
      <input
        type="checkbox"
        id="réglé"
        checked
        onChange={(e) => setRéglé(e.target.value)}
      ></input>
      <p>Select</p>
      <select id="select" onChange={(e) => setSelect(e.target.value)}>
        <option>dépense</option>
        <option>budget</option>
      </select>
      <p>Tricount</p>
      <select id="tricount" onChange={(e) => setTricount(e.target.value)}>
        <option>Non</option>
        <option>Tricount Flo</option>
      </select>
      <p>Mois</p>
      <input
        type="text"
        id="mois"
        value="Septembre"
        onChange={(e) => setMois(e.target.value)}
      ></input>
      <p>Date</p>
      <input
        type="date"
        id="date"
        value="2024-09-13"
        onChange={(e) => setDate(e.target.value)}
      ></input>
      <button>Submit to notion</button>
      {/* onClick={submitFormToNotion} */}
    </div>
  );
}

export default ExportToNotion;
