//configuration de la connexion à la base de données mySQL
const mysql = require("mysql");
const mySQLdb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "check_compte",
});

//Connexion à la base de données mySQL
mySQLdb.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err);
    return;
  }
  console.log("Connecté à la base de données check_compte");
});

module.exports = { mySQLdb };
