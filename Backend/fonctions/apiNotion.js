// require("dotenv").config();

//Authentification

const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: "secret_PHC8MlL2GFcMRzSSR0FtRdaqaIOAm03OiTGUscwnLwS",
});

export async function getFilteredPages() {
  (async () => {
    const databaseId = "d9824bdc-8445-4327-be8b-5b47500af6ce";
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    console.log(response);
  })();
}
