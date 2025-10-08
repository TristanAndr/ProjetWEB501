const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());

const connection = mysql.createConnection({
  host: '10.18.206.241',
  user: 'donovan',
  password: 'donovan',
  database: 'Projet'
});

connection.connect(err => {
  if (err) {
    console.error("Erreur MySQL :", err);
    return;
  }
  console.log("✅ Connecté à la base MySQL");
});

// Route pour renvoyer les données
app.get("/personnes", (req, res) => {
  connection.query("SELECT * FROM Personne", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur SQL");
      return;
    }
    res.json(results); // renvoie les lignes au navigateur
  });
});
