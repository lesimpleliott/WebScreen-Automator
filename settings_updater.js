// Importer le module fs pour travailler avec le système de fichiers
const fs = require("fs");
const readline = require("readline");

// Importer le fichier de configuration des viewports
const settingsPath = "./settings.js";
let settings = require(settingsPath);

// Création d'une interface readline pour capturer l'entrée de l'utilisateur
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Fonction pour mettre à jour et écrire dans le fichier de configuration
function updateSettings(newSettings) {
  const settingsContent = `// Paramètres de configuration
module.exports = ${JSON.stringify(newSettings, null, 2)};
`;
  fs.writeFileSync(settingsPath, settingsContent, "utf8");
  console.log("\n✅ Les viewports ont été mis à jour avec succès.\n");
}

// Demande de mise à jour des viewports à l'utilisateur
function askViewports() {
  console.log("\nConfiguration des viewports actuels:");
  settings.viewports.forEach((viewport, index) => {
    console.log(
      `${index + 1}. Label: ${viewport.screen}, Width: ${
        viewport.width
      }, Height: ${viewport.height}`
    );
  });

  rl.question(
    "\nSouhaitez-vous (A)jouter, (M)odifier, (S)upprimer ou (C)onserver les viewports actuels ? [A/M/S/C]: ",
    (action) => {
      if (action.toLowerCase() === "a") {
        addViewport();
      } else if (action.toLowerCase() === "m") {
        modifyViewport();
      } else if (action.toLowerCase() === "s") {
        deleteViewport();
      } else {
        console.log("\nAucune modification apportée aux viewports.");
        rl.close();
      }
    }
  );
}

// Fonction pour ajouter un nouveau viewport
function addViewport() {
  rl.question("Label du viewport (ex: iPhone15): ", (label) => {
    rl.question("Largeur du viewport (en pixels): ", (width) => {
      rl.question("Hauteur du viewport (en pixels): ", (height) => {
        settings.viewports.push({
          screen: label,
          width: parseInt(width, 10),
          height: parseInt(height, 10),
        });
        console.log("\n✅ Viewport ajouté avec succès.\n");
        updateSettings(settings);
        rl.close();
      });
    });
  });
}

// Fonction pour modifier un viewport existant
function modifyViewport() {
  rl.question("Numéro du viewport à modifier: ", (index) => {
    const viewportIndex = parseInt(index, 10) - 1;
    if (settings.viewports[viewportIndex]) {
      rl.question(
        `Nouveau label du viewport (actuel: ${settings.viewports[viewportIndex].screen}): `,
        (label) => {
          rl.question(
            `Nouvelle largeur du viewport (en pixels) (actuelle: ${settings.viewports[viewportIndex].width}): `,
            (width) => {
              rl.question(
                `Nouvelle hauteur du viewport (en pixels) (actuelle: ${settings.viewports[viewportIndex].height}): `,
                (height) => {
                  settings.viewports[viewportIndex] = {
                    screen: label || settings.viewports[viewportIndex].screen,
                    width: width
                      ? parseInt(width, 10)
                      : settings.viewports[viewportIndex].width,
                    height: height
                      ? parseInt(height, 10)
                      : settings.viewports[viewportIndex].height,
                  };
                  console.log("\n✅ Viewport modifié avec succès.\n");
                  updateSettings(settings);
                  rl.close();
                }
              );
            }
          );
        }
      );
    } else {
      console.error("\n❌ Erreur: Numéro de viewport invalide.\n");
      rl.close();
    }
  });
}

// Fonction pour supprimer un viewport existant
function deleteViewport() {
  rl.question("Numéro du viewport à supprimer: ", (index) => {
    const viewportIndex = parseInt(index, 10) - 1;
    if (settings.viewports[viewportIndex]) {
      settings.viewports.splice(viewportIndex, 1);
      console.log("\n✅ Viewport supprimé avec succès.\n");
      updateSettings(settings);
      rl.close();
    } else {
      console.error("\n❌ Erreur: Numéro de viewport invalide.\n");
      rl.close();
    }
  });
}

// Lancer la demande de mise à jour des viewports
askViewports();
