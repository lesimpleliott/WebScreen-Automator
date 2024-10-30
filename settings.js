// Définir la hauteur de la page à capturer
const fullHeight = true; // @type {boolean}

// Dossier et nom de fichier
const outputDir = "export"; // Dossier d'export pour les captures d'écran : @type {string}
const filenameType = "title"; // Définir le type de nom de fichier : @type {string} : "title" | "domain"
const includeTimestamp = true; // Inclure le timestamp dans le nom du fichier : @type {boolean}

// Ajuster les paramètres d'exécution du script
const manualAdjustment = true; // Ajustement manuel de la page avant capture : @type {boolean}
const waitTime = 2000; // Temps d'attente en millisecondes avant chaque capture d'écran, désactiver par défaut si manualAdjustment = false : @type {number}

// Définition des résolutions d'écran à capturer
const viewports = [
  { screen: "iPhone15", width: 393, height: 750 },
  { screen: "desktop80", width: 1194, height: 688 },
  { screen: "desktop90", width: 1342, height: 756 },
  { screen: "desktop100", width: 1492, height: 840 },
];

module.exports = {
  fullHeight,
  outputDir,
  manualAdjustment,
  waitTime,
  viewports,
  filenameType,
  includeTimestamp,
};
