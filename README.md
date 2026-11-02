# DevStandard

> Registre ouvert et gratuit de standards d'ingénierie logicielle pour assistants IA (Cursor, Antigravity, Claude Code, Codex, OpenCode).

Inspiré du modèle de **skills.sh** et **shadcn/ui**, **DevStandard** permet d'importer directement dans vos projets des règles et compétences vérifiées d'ingénierie Frontend et Backend, sans serveur ni configuration complexe.

---

## 🚀 Utilisation Rapide

Dans n'importe quel projet applicatif, vous pouvez installer et utiliser les standards avec `npx` :

### 1. Lister les standards disponibles
```bash
npx devstandard list
```

### 2. Installer un standard dans votre projet
```bash
# Frontend : Design tokens, typographie, espacements et WCAG 2.2 AA
npx devstandard add design-tokens

# Frontend : Formulaires robustes, états loading/empty/error
npx devstandard add forms-and-states

# Backend : Validation serveur stricte, rejet fail-closed
npx devstandard add server-validation
```

Les fichiers sont automatiquement placés dans :
```text
<votre-projet>/
└── .agents/
    └── skills/
        └── <nom-du-standard>/
            └── SKILL.md
```

Dès cet instant, votre assistant IA de code (Antigravity, Cursor, Claude Code, etc.) lit nativement le fichier et applique automatiquement ces normes à votre code.

---

## 📦 Catalogue des Standards Disponibles

### 🔷 Frontend

| Standard | Description | Commande |
| :--- | :--- | :--- |
| **`design-tokens`** | Couleurs sémantiques, grille 4px/8px, typographie et contrastes WCAG 2.2 AA. | `npx devstandard add design-tokens` |
| **`forms-and-states`** | Formulaires fiables, labels visibles, gestion obligatoire des états (loading, error, empty). | `npx devstandard add forms-and-states` |

### 🔷 Backend

| Standard | Description | Commande |
| :--- | :--- | :--- |
| **`server-validation`** | Politique de non-confiance (Zero Trust), validation stricte des entrées et gestion sans fuite d'erreurs. | `npx devstandard add server-validation` |

---

## 🛠️ Structure du Répertoire

```text
DevStandard/
├── bin/
│   └── devstandard.mjs        # CLI d'installation exécutée par npx
├── registry.json              # Registre public des standards disponibles
├── skills/
│   ├── frontend/
│   │   ├── design-tokens/
│   │   │   └── SKILL.md
│   │   └── forms-and-states/
│   │       └── SKILL.md
│   └── backend/
│       └── server-validation/
│           └── SKILL.md
└── package.json
```

---

## 🌐 Déploiement sur GitHub

1. Initialiser le dépôt Git (si ce n'est pas déjà fait) :
   ```bash
   git add .
   git commit -m "feat: initial open standard skills and cli"
   ```
2. Créer le dépôt sur votre GitHub et pousser les commits :
   ```bash
   git remote add origin https://github.com/<votre-utilisateur>/devstandard.git
   git branch -M main
   git push -u origin main
   ```
3. *(Optionnel)* Publier le paquet sur npm (`npm publish`) pour permettre à quiconque d'exécuter directement `npx devstandard add <skill>`.
