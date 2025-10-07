<?php
session_start();
include("../../config.php");

$connexion = mysqli_connect($Serveur, $Utilisateur, $Password, $Bdd);
if (!$connexion) {
    die("<h2 class='messageRouge'>La connexion à la base de données a échoué : " . mysqli_connect_error() . "</h2>");
}

$nom = mysqli_real_escape_string($connexion, $_GET['nom_ressource'] ?? '');
$categorie = mysqli_real_escape_string($connexion, $_GET['categories'] ?? '');
$etat = mysqli_real_escape_string($connexion, $_GET['etats'] ?? '');
$laboratoire = mysqli_real_escape_string($connexion, $_GET['laboratoires'] ?? '');
$date_debut = $_GET['date_debut'] ?? '';
$date_fin = $_GET['date_fin'] ?? '';

$query = "
SELECT ressources.id AS ressource_id, ressources.image, ressources.nom, ressources.quantiteStock, ressources.description, ressources.documentation, 
    laboratoires.ville AS laboratoire, categories.nom_categorie, etats.nom_etat 
FROM ressources
JOIN laboratoires ON ressources.labo_id = laboratoires.id
JOIN categories ON ressources.categorie_id = categories.id
JOIN etats ON ressources.etat_id = etats.id
WHERE 1=1";

if (!empty($nom)) {
    $query .= " AND ressources.nom LIKE '%$nom%'";
}
if (!empty($categorie)) {
    $query .= " AND categories.nom_categorie = '$categorie'";
}
if (!empty($etat)) {
    $query .= " AND etats.nom_etat = '$etat'";
}
if (!empty($laboratoire)) {
    $query .= " AND laboratoires.ville = '$laboratoire'";
}
if (!empty($date_debut)) {
    $query .= " AND ressources.date_emprunt >= '$date_debut'";
}
if (!empty($date_fin)) {
    $query .= " AND ressources.date_retour <= '$date_fin'";
}

$resultat = mysqli_query($connexion, $query);
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Accueil</title>
    <link href="https://fonts.googleapis.com/css?family=Poppins:300" rel="stylesheet">
    <link rel="stylesheet" href="../../styles.css">
</head>
<body>
    <div class="logoSite">
        <a href="../../accueil.php">
            <img src="../../Images/logo.png" alt="Logo du site">
        </a>
        <nav class="menu">
            <ul>
                <li><a href="/Ressources/ressourcesUtilisateurs/pageRessourcesUtilisateurs.php">Emprunter des ressources</a></li>
                <li><a href="../../menuGestion/menuGestionRessources.php">Gestion des ressources</a></li>
                <li><a href="">Choisir un laboratoire</a></li>
                <li><a href="">Statistiques</a></li>
                <li><a href="">Inventaire</a></li>
                <li><a href="">Contact</a></li>
                <li><a href="../../compte.php">Mon Profil</a></li>
            </ul>
            <div class="filtre_container">
                <form method="GET">
                    <div class="form-group">
                        <label for="date_debut">Date d'emprunt :</label>
                        <input type="date" id="Date_debut" name="date_debut" value="<?php echo htmlspecialchars($date_debut); ?>">

                        <label for="date_fin">Date de retour :</label>
                        <input type="date" id="Date_fin" name="date_fin" value="<?php echo htmlspecialchars($date_fin); ?>">

                        <label for="categories">Catégories :</label>
                        <select name="categories" id="categories">
                            <option value="">Sélectionnez une catégorie</option>
                            <?php
                                $res = mysqli_query($connexion, "SELECT nom_categorie FROM categories ORDER BY nom_categorie ASC");
                                while ($row = mysqli_fetch_assoc($res)) {
                                    $selected = ($row["nom_categorie"] === $categorie) ? 'selected' : '';
                                    echo "<option value='" . htmlspecialchars($row["nom_categorie"]) . "' $selected>" . htmlspecialchars($row["nom_categorie"]) . "</option>";
                                }
                            ?>
                        </select>

                        <label for="etats">État :</label>
                        <select name="etats" id="etats">
                            <option value="">Sélectionnez l'état</option>
                            <?php
                                $res = mysqli_query($connexion, "SELECT nom_etat FROM etats ORDER BY nom_etat ASC");
                                while ($row = mysqli_fetch_assoc($res)) {
                                    $selected = ($row["nom_etat"] === $etat) ? 'selected' : '';
                                    echo "<option value='" . htmlspecialchars($row["nom_etat"]) . "' $selected>" . htmlspecialchars($row["nom_etat"]) . "</option>";
                                }
                            ?>
                        </select>

                        <label for="laboratoires">Laboratoires :</label>
                        <select name="laboratoires" id="laboratoires">
                            <option value="">Sélectionnez un laboratoire</option>
                            <?php
                                $res = mysqli_query($connexion, "SELECT ville FROM laboratoires ORDER BY ville ASC");
                                while ($row = mysqli_fetch_assoc($res)) {
                                    $selected = ($row["ville"] === $laboratoire) ? 'selected' : '';
                                    echo "<option value='" . htmlspecialchars($row["ville"]) . "' $selected>Laboratoire de " . htmlspecialchars($row["ville"]) . "</option>";
                                }
                            ?>
                        </select>

                        <label for="nom_ressource">Rechercher par noms :</label>
                        <input type="text" id="nom_ressource" name="nom_ressource" placeholder="Rechercher par noms" value="<?php echo htmlspecialchars($nom); ?>">

                        <div class="submit-btn">
                            <input type="submit" value="Filtrer">
                        </div>
                    </div>
                </form>
            </div>
        </nav>
    </div>                                   
    <div class="table-container">
        <table id="data-table">
            <tr>
                <th>Image</th>
                <th>Nom</th>
                <th>Quantité en Stock</th>
                <th>Description</th>
                <th>Documentation</th>
                <th>Laboratoire</th>
                <th>Catégorie</th>
                <th>État</th>
                <th>Action</th>
            </tr>

            <?php while ($data = mysqli_fetch_assoc($resultat)) { ?>
                <tr>
                    <td><img src="../../Images/<?php echo htmlspecialchars($data['image']); ?>" width="50" alt="Image ressource"></td>
                    <td><?php echo htmlspecialchars($data['nom']); ?></td>
                    <td><?php echo htmlspecialchars($data['quantiteStock']); ?></td>
                    <td><?php echo htmlspecialchars($data['description']); ?></td>
                    <td>
                        <button onclick="afficherDocumentation('<?php echo htmlspecialchars(addslashes($data['documentation'])); ?>')">Voir</button>
                    </td>
                    <td><?php echo htmlspecialchars($data['laboratoire']); ?></td>
                    <td><?php echo htmlspecialchars($data['nom_categorie']); ?></td>
                    <td><?php echo htmlspecialchars($data['nom_etat']); ?></td>
                    <td>
                        <form action="../Emprunts/certificat_pret.php" method="GET">
                            <input type="hidden" name="ressource_id" value="<?php echo htmlspecialchars($data['ressource_id']); ?>">
                            <input type="hidden" name="nom" value="<?php echo htmlspecialchars($data['nom']); ?>">
                            <input type="hidden" name="quantiteStock" value="<?php echo htmlspecialchars($data['quantiteStock']); ?>">
                            <input type="hidden" name="labo" value="<?php echo htmlspecialchars($data['laboratoire']); ?>">
                            <input type="hidden" name="categorie" value="<?php echo htmlspecialchars($data['nom_categorie']); ?>">
                            <input type="hidden" name="etat" value="<?php echo htmlspecialchars($data['nom_etat']); ?>">
                            <input type="hidden" name="image" value="<?php echo htmlspecialchars($data['image']); ?>">
                            <input type="hidden" name="description" value="<?php echo htmlspecialchars($data['description']); ?>">
                            <input type="hidden" name="documentation" value="<?php echo htmlspecialchars($data['documentation']); ?>">
                            <button type="submit">Emprunter</button>
                        </form>
                    </td>
                </tr>
            <?php } ?>
        </table>
    </div>

    <div class="pagination-controls">
        <button id="prev-btn" disabled>Précédent</button>
        <button id="next-btn">Suivant</button>
    </div>

    <div id="docPopup" class="popup">
        <div class="popup-content">
            <span class="close" onclick="fermerDocumentation()">&times;</span>
            <p id="docTexte"></p>
        </div>
    </div>
    <script src="../../main.js"></script>
</body>
</html>
