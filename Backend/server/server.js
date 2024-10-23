//CONFIGURATION DU SERVEUR
const { app } = require("./serverConfiguration.js");
const fs = require("node:fs");
//IMPORT DES ELEMENTS DE CONFIGURATION DE MYSQL et notion
const {
  mySQLdb,
} = require("../mySQLDatabase/configuration/mySQLConfiguration.js");
const {
  notion,
  jsonParser,
  entréesSortiesDbID,
  moisDbID,
  catégorieDbID,
  pageIdsFilePath,
  testEntréesSortiesDbID,
} = require("../notionDatabase/configurations/notionConfiguration.js");

//_______________________________________________________________________________________________________________________

//OPERATIONS MySQL
//Ajouter des dépenses à la base de données mySQL
app.post("/addExpensesOnMySQL", (req, res) => {
  const { data, table } = req.body;
  const sql = `INSERT INTO ?? (name, montant, catégorie, maPart, réglé, type, tricount, mois, date, paiement) VALUES ?`; //Requête SQL pour ajouter une dépense
  //Récupération des données  de la requête POST
  const values = data.map((expense) => [
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
  ]);

  mySQLdb.query(sql, [table, values], (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "Erreur lors de l'ajout de la dépense" });
    } else {
      res.status(200).send("Dépenses ajoutées avec succès");
      console.log("dépenses ajoutées");
    }
  });
});

//Supprimer toutes les dépenses d'une table mySQL
app.delete("/deleteAllExpensesOnMySQL", (req, res) => {
  console.log(req.body);
  const { table } = req.body;
  console.log(table);
  const sql = `DELETE FROM ??`; //Requête SQL pour supprimer toutes les dépenses d'une table
  mySQLdb.query(sql, [table], (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "Erreur lors de la suppression des dépenses" });
    } else {
      res.status(200).send("Dépenses supprimées avec succès");
      console.log("dépenses supprimées");
    }
  });
});

//OPERATIONS NOTION
// Route pour récupérer les propriétés de la base de données
app.get("/getNotionDbProperties", async (req, res) => {
  try {
    const response = await notion.databases.retrieve({
      database_id: entréesSortiesDbID,
    });
    // Retourne les propriétés dans la réponse
    res.status(200).json(response.properties);
  } catch (error) {
    console.error("Erreur lors de la récupération des propriétés :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des propriétés." });
  }
});

//Fonction pour récupérer l'ID d'une page (pour les relations)
async function getPageId(dataBaseId, dataNameType, dataName) {
  //Recherche de l'ID dans le cache et récupération de toutes les infos pour potentiel ajout d'ID
  const pageIdsFileContent = JSON.parse(
    fs.readFileSync(pageIdsFilePath, "utf8")
  );
  const pageId = pageIdsFileContent.find(
    (element) => element[dataNameType] === dataName
  )?.id;
  if (!pageId) {
    try {
      const responsePage = await notion.databases.query({
        database_id: dataBaseId,
        filter: {
          property: dataNameType,
          title: {
            equals: dataName,
          },
        },
      });
      //Extraction de l'ID et du nom de la page
      pageInfos = responsePage.results.map((page) => ({
        [dataNameType]: dataName,
        id: page.id,
      }))[0];
      //Sauvegarde de l'ID et du nom dans le cache
      pageIdsFileContent.push(pageInfos);
      fs.writeFileSync(
        pageIdsFilePath,
        JSON.stringify(pageIdsFileContent, null, 2)
      );
    } catch (error) {
      console.log(error);
      // res.status(500).send("Erreur lors de la récupération des pages");
    }
  }
  return pageId;
}

// Route pour soumettre des données à la base de données Notion
app.post("/addExpensesToNotion", jsonParser, async (req, res) => {
  const { data } = req.body;
  // const name = req.body.name;
  // const montant = req.body.montant;
  // const catégorie = req.body.catégorie;
  // const réglé = req.body.réglé;
  // const select = req.body.select;
  // const tricount = req.body.tricount;
  // const mois = req.body.mois;
  // const date = req.body.date;
  try {
    for (const expense of data) {
      const {
        name,
        montant,
        catégorie,
        maPart,
        réglé,
        type,
        tricount,
        mois,
        date,
        paiement,
      } = expense;
      //Récupération des IDS de la page mois
      const idMois = await getPageId(moisDbID, "Mois", mois);
      // const idCatégorie = await getPageId(
      //   catégorieDbID,
      //   "Catégorie",
      //   catégorie
      // );
      console.log(
        name,
        montant,
        catégorie,
        maPart,
        réglé,
        type,
        tricount,
        mois,
        date,
        paiement
      );
      // Créer un objet de propriétés dynamiques
      const properties = {
        Name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        Montant: {
          number: montant,
        },
        "Ma part": {
          number: maPart,
        },
        Réglé: {
          checkbox: réglé,
        },
        Type: {
          select: {
            name: type,
          },
        },
        Tricount: {
          multi_select: tricount ? [{ name: tricount }] : [],
        },
        Mois: {
          relation: [
            {
              id: idMois,
            },
          ],
        },
        Date: {
          date: {
            start: date, // Format ISO (YYYY-MM-DD)
          },
        },
        Paiement: {
          select: {
            name: paiement,
          },
        },
      };

      // Ajouter la propriété Catégorie si elle est définie
      // if (idCatégorie) {
      //   properties.Catégorie = {
      //     relation: [
      //       {
      //         id: idCatégorie,
      //       },
      //     ],
      //   };
      // }

      const responseExpenseCreation = await notion.pages.create({
        parent: { database_id: entréesSortiesDbID }, //testEntréesSortiesDbID
        properties,
      });
      console.log("Page ajoutée!");
    }
  } catch (error) {
    console.log(error);
  }
});
