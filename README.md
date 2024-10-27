# Capture d'Écran Automatisée d'un site internet

auteur : Eliott Lesimple (eleGarage.fr)
version : 1.0.0
date : 27/10/2024

Ce script utilise Puppeteer pour capturer des captures d’écran d’une page web aux différentes résolutions spécifiées dans un fichier de configuration externe (`viewports.js`).
Il est conçu pour permettre une configuration manuelle initiale, puis capturer automatiquement toute la page pour chaque résolution, avec le navigateur visible durant le processus.

## Prérequis

- **Node.js** (version 12 ou supérieure)
- **Puppeteer** : Pour automatiser le navigateur (installation dans les étapes ci-dessous)

## Installation

1. **Cloner le projet** ou télécharger les fichiers requis.
2. **Installer les dépendances** avec `npm install` :

   ```bash
   npm install puppeteer prompt-sync
   ```

3. **Vérifier le fichier `viewports.js`** : Assurez-vous que le fichier existe et contient les configurations de viewport souhaitées. Le format attendu est le suivant :

   ```javascript
   // viewports.js
   module.exports = [
     { screen: string, width: number, height: number },
     { screen: string, width: number, height: number },
     { screen: string, width: number, height: number },
   ];
   ```

## Utilisation du Script

### Lancement du script

Pour exécuter le script, utilisez la commande suivante :

```bash
npm run export
```

### Fonctionnalités

- **Configuration initiale manuelle** : Le navigateur s’ouvre, charge l’URL spécifiée, et attend que l’utilisateur appuie sur `Entrée` dans le terminal pour démarrer les captures d’écran. Cela permet d’ajuster la page manuellement (fermer des pop-ups, changer de thème, entrer les mots de passe etc.).
- **Captures d’écran multi-résolutions** : Pour chaque résolution définie dans `viewports.js`, le script ajuste le viewport et capture l’intégralité de la page et sur toute sa hauteur.
- **Affichage en mode visible** : Le navigateur reste visible tout au long du processus, permettant de suivre visuellement chaque étape de la capture.

### Options Personnalisables

1. **URL** : Vous pouvez saisir une ou plusieurs URL lors du lancement du script, séparées par des virgules (ex. : elegarage.fr, github.com). Le script accepte chaque URL avec ou sans protocole (http://, https:// ou simplement www.) et les normalise automatiquement.

   - Saisie multiple d’URL : Si vous entrez plusieurs URL, le script les traite successivement, en lançant une session de capture d’écran distincte pour chaque URL.
   - Validation : Le script vérifie que chaque URL est valide et affiche un message d’erreur si l’une d’entre elles est incorrectement formatée ou non séparée par des virgules.
   - Exemple de saisie :

```bash
elegarage.fr, katelio.fr, https://github.com/lesimpleliott
```

2. **fullHeight** : Contrôle si toute la hauteur de la page doit être capturée.

   - Type : `boolean`
   - Valeur par défaut : `true`
   - Description : Si `true`, le script capture toute la hauteur de la page (en scrollant automatiquement) pour chaque résolution. Si `false`, il capture uniquement la hauteur du viewport défini.
   - Exemple d’utilisation :
     ```javascript
     const fullHeight = false; // Capture uniquement la partie visible
     const fullHeight = true; // Capture toute la hauteur de la page
     ```

3. **viewports.js** : Contient les configurations de résolution.

   - Structure : Tableau d’objets avec les clés `screen`, `width`, et `height`.
   - Exemple :
     ```javascript
     [
       { screen: "mobile", width: 375, height: 667 },
       { screen: "tablet", width: 768, height: 1024 },
       { screen: "desktop", width: 1440, height: 900 },
       // etc.
     ];
     ```
   - Le nom de chaque capture d’écran inclut la largeur définie dans `width`.

4. **outputDir** : Dossier d’export pour les captures.
   - Type : `string`
   - Valeur par défaut : `export`
   - Description : Dossier où les captures d’écran seront enregistrées. Le script crée ce dossier s’il n’existe pas.

### Exemple d'Exécution

Étape 1 : Personnaliser le fichier **viewports.js**

```javascript
[
  { screen: "80", width: 1194, height: 688 },
  { screen: "90", width: 1342, height: 756 },
  { screen: "100", width: 1492, height: 840 },
];
```

Étape 2 : Lancer le script et suivre les instructions

```bash
npm run export
Entrez l'URL du site à capturer : elegarage.fr, https://github.com/lesimpleliott
🔍 Configurez la page comme souhaité. Appuyez sur Entrée pour continuer...
```

Étape 3 : Fichiers exportés

```
export/
├── elegarage-fr_1194w.png
├── elegarage-fr_1342w.png
├── elegarage-fr_1492w.png
├── github-com_1194w.png
├── github-com_1342w.png
└── github-com_1492w.png
```

---

### Notes

- **Noms de fichier personnalisés** : Les captures incluent le nom de domaine et la largeur pour faciliter l’organisation.
- **Configurations manuelles** : Le script offre une grande flexibilité en permettant des réglages initiaux manuels avant le lancement des captures d’écran.
- **Dépendances** : Assurez-vous que `puppeteer` et `prompt-sync` sont installés pour exécuter le script correctement.
