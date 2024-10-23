//configuration de la connexion à la base de données Notion
const bodyParser = require("body-parser");
const { Client } = require("@notionhq/client");

const { clearScreenDown } = require("node:readline");
let jsonParser = bodyParser.json();

const notion = new Client({
  auth: "secret_PHC8MlL2GFcMRzSSR0FtRdaqaIOAm03OiTGUscwnLwS",
});
const entréesSortiesDbID = "03245538ca1a4aa98c1ce204ffb6c359";
const testEntréesSortiesDbID = "292021a5f0e54fe0af2e5f1ea75a5f71";
const moisDbID = "0da9a72abb3942ac944463d5a73de9d1";
const catégorieDbID = "4c9cd2d0634b42d8a00c20785cd6f8d7";

const pageIdsFilePath = "server/pageIds.json";

module.exports = {
  notion,
  jsonParser,
  entréesSortiesDbID,
  testEntréesSortiesDbID,
  moisDbID,
  catégorieDbID,
  pageIdsFilePath,
};
