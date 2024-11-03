const readline = require("readline");

// Fonction pour extraire le nom de domaine sans les routes et remplacer les points par des tirets
function getDomainName(url) {
  const hostname = new URL(url).hostname;
  return hostname.replace(/\./g, "-");
}

// Fonction pour normaliser l'URL
function normalizeUrl(inputUrl) {
  if (!/^https?:\/\//i.test(inputUrl)) {
    inputUrl = "https://" + inputUrl;
  }
  try {
    return new URL(inputUrl).href;
  } catch (error) {
    console.error(
      `URL invalide : "${inputUrl}". Veuillez vérifier l'URL fournie.`
    );
    return null; // Retourne null si l'URL est invalide
  }
}

// Fonction pour vérifier et nettoyer la saisie de plusieurs URL
function getValidUrls(input) {
  // Sépare les URL par la virgule, autorise un espace après la virgule
  const urls = input
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);

  // Vérifier chaque URL pour s'assurer qu'elle est valide
  const validUrls = urls.map(normalizeUrl).filter((url) => url !== null);

  // Vérifie si une URL était incorrecte
  if (validUrls.length !== urls.length) {
    console.log("🚨 Veuillez séparer chaque URL par une virgule.");
    process.exit(1); // Quitte si la saisie est incorrecte
  }

  return validUrls;
}

// Fonction pour obtenir un horodatage pour les noms de fichiers
function getTimestamp() {
  const date = new Date();
  return (
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    "-" +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2)
  );
}

// Fonction pour demander une validation manuelle et attendre l'appui sur Entrée
function waitForEnter(message) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(message, () => {
      rl.close();
      resolve();
    });
  });
}

// Fonction de temporisation
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

module.exports = {
  getDomainName,
  getValidUrls,
  getTimestamp,
  waitForEnter,
  delay,
};
