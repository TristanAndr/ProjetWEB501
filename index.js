const express = require("express");
const mysql = require("mysql2");
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
    console.error("Erreur de connexion :", err);
    return;
  }
  console.log("✅ Connecté à la base de données !");
});

app.get("/projet", (req, res) => {
  connection.query("SELECT * FROM Personne", (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Erreur SQL" });
    }
    res.json(rows);
  });
});

app.listen(3000, () => {
  console.log("🚀 API disponible sur http://10.18.207.148:3000/projet");
});
