const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Import des paramètres de configuration
const {
  fullHeight,
  outputDir,
  manualAdjustment,
  waitTime,
  viewports,
  filenameType,
  includeTimestamp,
} = require("./settings");

// Import des fonctions utilitaires
const {
  getDomainName,
  getValidUrls,
  getTimestamp,
  waitForEnter,
  delay,
} = require("./utils");

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

          // Temporisation avant chaque capture si `waitTime > 0`
          if (waitTime > 0) {
            console.log(
              `⏳ Attente de ${waitTime / 1000} secondes avant la capture...`
            );
            const spinnerFrames = ["|", "/", "-", "\\"];
            let spinnerIndex = 0;
            const interval = setInterval(() => {
              process.stdout.write(
                `\r${spinnerFrames[spinnerIndex++ % spinnerFrames.length]} `
              );
            }, 250);
            await delay(waitTime);
            clearInterval(interval);
            process.stdout.write("\r ");
          }

          // Capture d'écran
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
        $;
        console.log("-------------------------");
        console.log(
          "✨ Toutes les captures d'écran ont été prises pour toutes les URL."
        );
      }
    }
  );
})();
