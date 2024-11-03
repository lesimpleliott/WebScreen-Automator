# GetScreenFromWebsite

## Description

**GetScreenFromWebsite** est un utilitaire basé sur Node.js qui utilise Puppeteer pour capturer des captures d'écran de sites web selon différents viewports. Ce projet facilite l'automatisation de la prise de captures d'écran pour tester l'affichage de sites sur divers dispositifs et résolutions.

## Table des Matières

- [Installation](#installation)
- [Utilisation](#utilisation)
- [Configuration](#configuration)
- [Export](#export)
- [Fonctionnalités](#fonctionnalités)
- [Dépendances](#dépendances)
- [Contributeurs](#contributeurs)

## Installation

1. Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre système.
2. Clonez le dépôt :
   ```bash
   git clone <url-du-repo>
   cd getscreenfromwebsite
   ```
3. Installez les dépendances nécessaires :
   ```bash
   npm install
   ```

## Utilisation

- **`npm run export`** : Exécute `script.js` pour capturer des captures d'écran.
- **`npm run settings`** : Exécute `settings_updater.js` pour modifier les paramètres de configuration.
- **`npm run viewports`** : Exécute `viewports_updater.js` pour gérer les viewports.

## Configuration

### `npm run settings`

La commande `npm run settings` permet de modifier les paramètres de configuration du projet. Lors de son exécution, le script `settings_updater.js` est lancé, et l'utilisateur peut interagir via la console pour mettre à jour les configurations définies dans `settings.js`.

**Réglages disponibles et leur signification :**

- **`fullHeight`** : Définit si la capture doit couvrir toute la hauteur de la page. `true` capture la page entière, `false` capture uniquement la partie visible.
- **`outputDir`** : Spécifie le répertoire où les captures d'écran seront enregistrées.
- **`manualAdjustment`** : Active (`true`) ou désactive (`false`) la possibilité d'ajuster la page manuellement avant la capture.
- **`waitTime`** : Temps en millisecondes à attendre avant de prendre la capture d'écran, permettant le chargement des animations ou du contenu dynamique.
- **`viewports`** : Une liste des configurations de tailles d'écran (voir ci-dessous pour des détails supplémentaires).
- **`filenameType`** : Type de nommage des fichiers générés (`"title"` utilise le titre de la page, `"domain"` utilise le nom de domaine).
- **`includeTimestamp`** : Indique si un horodatage doit être inclus dans le nom du fichier.

Cette commande permet une personnalisation précise des paramètres pour s'adapter aux besoins des tests et des captures.

### `npm run viewports`

La commande `npm run viewports` est utilisée pour gérer les configurations des viewports. Elle lance le script `viewports_updater.js`, permettant de manipuler les tailles d'écran simulées pour les captures d'écran.

**Fonctionnement :**

- Le script affiche la liste actuelle des viewports configurés.
- L'utilisateur peut choisir de :
  - **(A)jouter** un nouveau viewport en précisant un label, une largeur (`width`) et une hauteur (`height`).
  - **(M)odifier** un viewport existant en mettant à jour ses dimensions ou son label.
  - **(S)upprimer** un viewport de la liste pour affiner les tests.
  - **(Q)uitter** les configurations existantes sont sauvegardées et le script est fermé.

Les modifications sont sauvegardées dans `settings.js`, garantissant leur application lors de la prochaine exécution.

**Explications des attributs de viewport :**

- **`label`** : Une étiquette descriptive pour identifier le viewport (ex. : `mobile`, `desktop`).
- **`width`** : La largeur du viewport en pixels.
- **`height`** : La hauteur du viewport en pixels.

Ces attributs permettent de simuler des écrans spécifiques pour tester la réactivité et l'affichage de votre site web sur différentes résolutions.

## Export

### `npm run export`

La commande `npm run export` est la commande principale utilisée pour lancer le script `script.js`, qui effectue la capture d'écran des sites web spécifiés.

**Fonctionnement :**

- Demande à l'utilisateur de saisir une ou plusieurs URLs.
- Charge chaque URL et applique les viewports définis.
- Prend des captures d'écran de la page entière ou de la vue spécifiée.
- Les fichiers sont sauvegardés dans `outputDir` avec un nom basé sur le type de nommage choisi et l'option d'horodatage.

**Étapes importantes :**

1. **Chargement des URLs** : Validation et normalisation des URLs.
2. **Navigation** : Chargement des pages avec Puppeteer et ajustements selon `manualAdjustment`.
3. **Capture** : Prend et enregistre les captures d'écran selon la configuration.
4. **Enregistrement** : Sauvegarde les captures avec un format personnalisé.

Cette commande est idéale pour automatiser la prise de captures d'écran sur plusieurs appareils simulés et obtenir un aperçu de l'affichage de votre site web.

## Fonctionnalités

- Capture d'écran de pages web sur plusieurs appareils et résolutions.
- Options d'ajustement manuel avant la capture.
- Gestion facile des paramètres et des viewports.
- Génération de noms de fichiers personnalisés avec ou sans horodatage.

## Dépendances

Ce projet utilise les dépendances suivantes :

- **puppeteer** (v23.6.0)

## Contributeurs

- Eliott Lesimple - eLeGarage
