const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const settings = require("./settings");
const {
  fullHeight,
  outputDir,
  manualAdjustment,
  waitTime,
  viewports,
  filenameType,
  includeTimestamp,
} = settings;

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

(async () => {
  // Demande des URL à l'utilisateur
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(
    "Entrez la ou les URL des sites à capturer : ",
    async (inputUrls) => {
      rl.close();
      const urls = getValidUrls(inputUrls);

      // Crée le dossier d'export si non existant
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      for (const url of urls) {
        const browser = await puppeteer.launch({
          headless: !manualAdjustment, // Mode invisible si `manualAdjustment` est `false`
        });
        const page = await browser.newPage();

        const domainName = getDomainName(url); // Obtenir le nom de domaine pour nommer les fichiers

        // Charger la page et attendre le chargement complet
        await page.goto(url, { waitUntil: "networkidle0" });

        const pageTitle = await page.title().then((title) =>
          title
            .replace(/[^a-z0-9]+/gi, "-") // Remplace les caractères spéciaux
            .replace(/^-+|-+$/g, "")
        );

        let baseName;
        if (filenameType === "title") {
          baseName = pageTitle;
        } else if (filenameType === "domain") {
          baseName = domainName;
        } else {
          console.error(`Type de nom de fichier inconnu : "${filenameType}"`);
          process.exit(1);
        }

        // Si `manualAdjustment` est activé, attend l'interaction utilisateur, sinon applique `waitTime`
        if (manualAdjustment) {
          await waitForEnter(
            `🔍 Configurez la page pour "${url}". Appuyez sur Entrée pour continuer...`
          );
        }

        for (const viewport of viewports) {
          await page.setViewport({
            width: viewport.width,
            height: viewport.height,
          });

          // Temporisation avant chaque capture uniquement si `manualAdjustment` est vrai et `waitTime > 0`
          if (manualAdjustment && waitTime > 0) {
            console.log(
              `⏳ Attente de ${waitTime / 1000} secondes avant la capture...`
            );
            await delay(waitTime);
          }

          const filename = `${baseName}_${viewport.width}w${
            includeTimestamp ? `_${getTimestamp()}` : ""
          }.png`;

          await page.screenshot({
            path: path.join(outputDir, filename),
            fullPage: fullHeight,
          });

          console.log(`✅ Capture d'écran : ${filename}`);
        }

        console.log(`🚀 Captures d'écran terminées pour "${url}"`);
        await browser.close();
      }

      if (urls.length > 1) {
        console.log(
          "✨ Toutes les captures d'écran ont été prises pour toutes les URL."
        );
      }
    }
  );
})();
