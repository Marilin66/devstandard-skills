# DevStandard

> Registre ouvert et gratuit de standards d'ingénierie logicielle pour assistants IA (Antigravity, Cursor, Claude Code, OpenAI Codex, OpenCode).

Inspiré du modèle de **skills.sh** et **shadcn/ui**, **DevStandard** permet d'importer directement dans vos projets des règles et compétences vérifiées d'ingénierie Frontend, Backend et Testing, sans serveur ni configuration complexe.

---

## 🚀 Utilisation Rapide

Dans n'importe quel projet applicatif, vous pouvez installer et utiliser les standards avec `npx` :

### 1. Lister les standards disponibles
```bash
npx github:Marilin66/devstandard-skills list
```

### 2. Installer un pack complet ou un standard spécifique

#### 📦 Par Packs :
```bash
# Installer tous les standards Frontend
npx github:Marilin66/devstandard-skills add frontend-pack

# Installer tous les standards Backend
npx github:Marilin66/devstandard-skills add backend-pack

# Installer l'intégralité du corpus
npx github:Marilin66/devstandard-skills add all
```

#### 🎯 Par Standard Individuel :
```bash
# Frontend
npx github:Marilin66/devstandard-skills add design-tokens
npx github:Marilin66/devstandard-skills add forms-and-states
npx github:Marilin66/devstandard-skills add accessible-components
npx github:Marilin66/devstandard-skills add accessibility-wcag
npx github:Marilin66/devstandard-skills add responsive-layouts
npx github:Marilin66/devstandard-skills add frontend-performance

# Backend
npx github:Marilin66/devstandard-skills add server-validation
npx github:Marilin66/devstandard-skills add security-iam
npx github:Marilin66/devstandard-skills add api-resilience
npx github:Marilin66/devstandard-skills add database-integrity
npx github:Marilin66/devstandard-skills add security-hardening
npx github:Marilin66/devstandard-skills add observability-logging

# Engineering & Qualité
npx github:Marilin66/devstandard-skills add testing-strategy
```

Les fichiers sont automatiquement placés dans :
```text
<votre-projet>/
└── .agents/
    └── skills/
        └── <nom-du-standard>/
            └── SKILL.md
```

Dès cet instant, votre assistant IA de code (Antigravity, Cursor, Claude Code, Codex, etc.) lit nativement le fichier et applique automatiquement ces normes à votre code.

---

## 📦 Catalogue Complet des Standards

### 🔷 Frontend

| Standard | Description | Commande |
| :--- | :--- | :--- |
| **`design-tokens`** | Couleurs sémantiques, grille 4px/8px, typographie et contrastes WCAG 2.2 AA. | `npx github:Marilin66/devstandard-skills add design-tokens` |
| **`forms-and-states`** | Formulaires fiables, labels visibles, gestion obligatoire des 5 états (`loading`, `error`, `empty`, `default`, `success`). | `npx github:Marilin66/devstandard-skills add forms-and-states` |
| **`accessible-components`** | Distinction bouton/lien, modales avec `focus-trap`, menus déroulants et tableaux de données accessibles. | `npx github:Marilin66/devstandard-skills add accessible-components` |
| **`accessibility-wcag`** | Normes WCAG 2.2 niveau AA : contrastes stricts, sémantique HTML, navigation 100% clavier, zoom 200%. | `npx github:Marilin66/devstandard-skills add accessibility-wcag` |
| **`responsive-layouts`** | Approche mobile-first, cibles tactiles 44x44px, points de rupture et tolérance zéro pour le débordement horizontal. | `npx github:Marilin66/devstandard-skills add responsive-layouts` |
| **`frontend-performance`** | Optimisation LCP/CLS/INP, chargement différé d'images, élimination des décalages de rendu. | `npx github:Marilin66/devstandard-skills add frontend-performance` |

### 🔷 Backend

| Standard | Description | Commande |
| :--- | :--- | :--- |
| **`server-validation`** | Politique Zero Trust Client, validation stricte par schémas, rejet `fail-closed` sans fuite de secrets. | `npx github:Marilin66/devstandard-skills add server-validation` |
| **`security-iam`** | Contrôle d'accès strict côté serveur, prévention des failles BOLA/IDOR, matrice RBAC et isolation étanche des données. | `npx github:Marilin66/devstandard-skills add security-iam` |
| **`api-resilience`** | Statuts HTTP sémantiques, pagination bornée, limitation de débit (rate limiting), timeouts et clés d'idempotence. | `npx github:Marilin66/devstandard-skills add api-resilience` |
| **`database-integrity`** | Transactions ACID, contraintes de clés étrangères, indexation stratégique, prévention requêtes N+1 et migrations sûres. | `npx github:Marilin66/devstandard-skills add database-integrity` |
| **`security-hardening`** | Durcissement OWASP Top 10 : anti-injection SQL, CSRF, SSRF, en-têtes HTTP de sécurité stricts (HSTS, CSP). | `npx github:Marilin66/devstandard-skills add security-hardening` |
| **`observability-logging`** | Logs JSON structurés, corrélation universelle Request ID / Trace ID, masquage des PII et sondes de santé `/health`. | `npx github:Marilin66/devstandard-skills add observability-logging` |

### 🔷 Engineering & Méthodes

| Standard | Description | Commande |
| :--- | :--- | :--- |
| **`testing-strategy`** | Pyramide de tests, tests systématiques des cas négatifs et refus d'accès, isolation totale des tests et CI reproductible. | `npx github:Marilin66/devstandard-skills add testing-strategy` |

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
│   │   ├── forms-and-states/
│   │   ├── accessible-components/
│   │   ├── accessibility-wcag/
│   │   ├── responsive-layouts/
│   │   └── frontend-performance/
│   ├── backend/
│   │   ├── server-validation/
│   │   ├── security-iam/
│   │   ├── api-resilience/
│   │   ├── database-integrity/
│   │   ├── security-hardening/
│   │   └── observability-logging/
│   └── engineering/
│       └── testing-strategy/
└── package.json
```

---

## 🌐 Déploiement sur GitHub (Quand vous serez prêt)

1. Valider et commiter les modifications :
   ```bash
   git add .
   git commit -m "feat: complete engineering skills catalog"
   ```
2. Lier votre dépôt GitHub distant et pousser :
   ```bash
   git remote add origin https://github.com/Marilin66/devstandard-skills.git
   git branch -M main
   git push -u origin main
   ```
