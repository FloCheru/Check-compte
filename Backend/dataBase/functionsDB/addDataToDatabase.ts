import db from "../dbConnexion.js";

interface Expense {
  name: string;
  montant: number;
  catégorie: string;
  maPart: number;
  réglé: boolean;
  type: string;
  tricount: string;
  mois: string;
  date: number;
  paiement: string;
}

export function addDataToDatabase(data: Expense[]): void {
  console.log("ehoh");
  data.forEach((expense) => {
    const query =
      "INSERT INTO account (name, montant, catégorie, maPart, réglé, type, tricount, mois, date, paiement)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      expense.name,
      expense.montant,
      expense.catégorie,
      expense.maPart,
      expense.réglé,
      expense.type,
      expense.tricount,
      expense.mois,
      expense.date,
      expense.paiement,
    ];
    db.run(query, values, function (err) {
      if (err) {
        console.error("Error inserting data: ", err.message);
      } else {
        console.log(`A row has been inserted with row id ${this.lastID}`);
      }
    });
  });
}

//pour tester la fonction
