const express = require("express");
const mysql = require("mysql");
const app = express();

// Configuration de la connexion MySQL
const connection = mysql.createConnection({
  host: '10.18.206.241',
  user: 'donovan',
  password: 'donovan',
  database: 'Projet'
});

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion :", err);
    return;
  }
  console.log("Connecté à la base de données !");
});

// Route pour récupérer les données
app.get("/personnes", (req, res) => {
  const query = "SELECT * FROM Personne";
  connection.query(query, (err, rows) => {
    if (err) {
      console.error("Erreur SQL :", err);
      res.status(500).send("Erreur serveur");
      return;
    }
    res.json(rows); // Envoie les données au navigateur sous forme JSON
  });
});

// Démarre le serveur
app.listen(3000, () => {
  console.log("Serveur démarré sur http://localhost:3000");
});
