# DevStandard

> Registre ouvert et gratuit de standards d'ingénierie logicielle pour assistants IA (Antigravity, Cursor, Claude Code, OpenAI Codex, OpenCode).

Inspiré du modèle de **skills.sh** et **shadcn/ui**, **DevStandard** permet d'importer directement dans vos projets des règles et compétences vérifiées d'ingénierie Frontend, Backend et Testing, sans serveur ni configuration complexe.

---

## 🚀 Utilisation Rapide

Dans n'importe quel projet applicatif, vous pouvez installer et utiliser les standards avec `npx` :

### 1. Lister les standards disponibles
```bash
npx devstandard list
```

### 2. Installer un pack complet ou un standard spécifique

#### 📦 Par Packs :
```bash
# Installer tous les standards Frontend
npx devstandard add frontend-pack

# Installer tous les standards Backend
npx devstandard add backend-pack

# Installer l'intégralité du corpus
npx devstandard add all
```

#### 🎯 Par Standard Individuel :
```bash
# Frontend
npx devstandard add design-tokens
npx devstandard add forms-and-states
npx devstandard add accessible-components
npx devstandard add accessibility-wcag
npx devstandard add responsive-layouts
npx devstandard add frontend-performance

# Backend
npx devstandard add server-validation
npx devstandard add security-iam
npx devstandard add api-resilience
npx devstandard add database-integrity
npx devstandard add security-hardening
npx devstandard add observability-logging

# Engineering & Qualité
npx devstandard add testing-strategy
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
| **`design-tokens`** | Couleurs sémantiques, grille 4px/8px, typographie et contrastes WCAG 2.2 AA. | `npx devstandard add design-tokens` |
| **`forms-and-states`** | Formulaires fiables, labels visibles, gestion obligatoire des 5 états (`loading`, `error`, `empty`, `default`, `success`). | `npx devstandard add forms-and-states` |
| **`accessible-components`** | Distinction bouton/lien, modales avec `focus-trap`, menus déroulants et tableaux de données accessibles. | `npx devstandard add accessible-components` |
| **`accessibility-wcag`** | Normes WCAG 2.2 niveau AA : contrastes stricts, sémantique HTML, navigation 100% clavier, zoom 200%. | `npx devstandard add accessibility-wcag` |
| **`responsive-layouts`** | Approche mobile-first, cibles tactiles 44x44px, points de rupture et tolérance zéro pour le débordement horizontal. | `npx devstandard add responsive-layouts` |
| **`frontend-performance`** | Optimisation LCP/CLS/INP, chargement différé d'images, élimination des décalages de rendu. | `npx devstandard add frontend-performance` |

### 🔷 Backend

| Standard | Description | Commande |
| :--- | :--- | :--- |
| **`server-validation`** | Politique Zero Trust Client, validation stricte par schémas, rejet `fail-closed` sans fuite de secrets. | `npx devstandard add server-validation` |
| **`security-iam`** | Contrôle d'accès strict côté serveur, prévention des failles BOLA/IDOR, matrice RBAC et isolation étanche des données. | `npx devstandard add security-iam` |
| **`api-resilience`** | Statuts HTTP sémantiques, pagination bornée, limitation de débit (rate limiting), timeouts et clés d'idempotence. | `npx devstandard add api-resilience` |
| **`database-integrity`** | Transactions ACID, contraintes de clés étrangères, indexation stratégique, prévention requêtes N+1 et migrations sûres. | `npx devstandard add database-integrity` |
| **`security-hardening`** | Durcissement OWASP Top 10 : anti-injection SQL, CSRF, SSRF, en-têtes HTTP de sécurité stricts (HSTS, CSP). | `npx devstandard add security-hardening` |
| **`observability-logging`** | Logs JSON structurés, corrélation universelle Request ID / Trace ID, masquage des PII et sondes de santé `/health`. | `npx devstandard add observability-logging` |

### 🔷 Engineering & Méthodes

| Standard | Description | Commande |
| :--- | :--- | :--- |
| **`testing-strategy`** | Pyramide de tests, tests systématiques des cas négatifs et refus d'accès, isolation totale des tests et CI reproductible. | `npx devstandard add testing-strategy` |

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
   git remote add origin https://github.com/<votre-utilisateur>/devstandard.git
   git branch -M main
   git push -u origin main
   ```
