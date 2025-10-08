// index.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());

// Connexion MySQL
const connection = mysql.createConnection({
  host: '10.18.206.241',
  user: 'donovan',
  password: 'donovan',
  database: 'Projet'
});

connection.connect(err => {
  if (err) {
    console.error("Erreur de connexion :", err);
    return;
  }
  console.log("✅ Connecté à la base de données !");
});

// Route API : renvoyer toutes les personnes
app.get("/personnes", (req, res) => {
  connection.query("SELECT * FROM Personne", (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Erreur SQL" });
    }
    res.json(rows);
  });
});

// Démarrer le serveur sur le port 3000
app.listen(3000, () => {
  console.log("🚀 API disponible sur http://localhost:3000/personnes");
});
