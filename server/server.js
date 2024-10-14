const fs = require("node:fs");
const express = require("express");
const { Client } = require("@notionhq/client");
const cors = require("cors");
let bodyParser = require("body-parser");
const { clearScreenDown } = require("node:readline");
let jsonParser = bodyParser.json();

const app = express();

app.use(cors());

const PORT = 4000;
const HOST = "localhost";

const notion = new Client({
  auth: "secret_PHC8MlL2GFcMRzSSR0FtRdaqaIOAm03OiTGUscwnLwS",
});
const entréesSortiesDbID = "292021a5f0e54fe0af2e5f1ea75a5f71";
const moisDbID = "0da9a72abb3942ac944463d5a73de9d1";
const catégorieDbID = "4c9cd2d0634b42d8a00c20785cd6f8d7";

const pageIdsFilePath = "server/pageIds.json";

// Route pour récupérer les propriétés de la base de données
app.get("/getDatabaseProperties", async (req, res) => {
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
      res.status(500).send("Erreur lors de la récupération des pages");
    }
  }
  return pageId;
}

// Route pour soumettre des données à la base de données Notion
app.post("/submitFormToNotion", jsonParser, async (req, res) => {
  const name = req.body.name;
  const montant = req.body.montant;
  const catégorie = req.body.catégorie;
  const réglé = req.body.réglé;
  const select = req.body.select;
  const tricount = req.body.tricount;
  const mois = req.body.mois;
  const date = req.body.date;
  try {
    //Récupération des IDS de la page mois
    const idMois = await getPageId(moisDbID, "Mois", mois);
    const idCatégorie = await getPageId(catégorieDbID, "Catégorie", catégorie);
    const responseDepenseCreation = await notion.pages.create({
      parent: { database_id: entréesSortiesDbID },
      properties: {
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
        Catégorie: {
          relation: [
            {
              id: idCatégorie,
            },
          ],
        },
        Réglé: {
          checkbox: réglé,
        },
        Select: {
          select: {
            name: select,
          },
        },
        Tricount: {
          multi_select: [{ name: tricount }],
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
      },
    });
    console.log("Page ajoutée!");
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, HOST, () => {
  console.log("Starting proxy at " + HOST + ":" + PORT);
});
