---
name: frontend-design-tokens
description: "Règles strictes de design sans cliché IA : fond blanc classique, suppression des stickers au profit d'icônes vectorielles SVG sobres, palette contextuelle par métier, contrastes WCAG 2.2 AA et adaptation native aux applications web et mobiles (iOS/Android)."
---

# Frontend Design Tokens & Human-Crafted Visual System Standard

Ce skill définit le système de design visuel obligatoire pour toutes les interfaces utilisateur (Web et Applications Mobiles). Il s'inspire directement des systèmes de design de confiance et de haute fiabilité : les portails institutionnels (ANIP Bénin, RAVIP, e-services.anip.bj, service-public.bj, DSFR, GOV.UK) et les interfaces modernes épurées (ChatGPT Web, Stripe, Linear).

> **Règle d'or « Zéro Cliché IA » :** Une interface générée ne doit **JAMAIS** ressembler à une maquette d'IA générique (pas de dégradés néon violets/magenta, pas de fonds sombres futuristes clichés, pas d'emojis ou stickers décoratifs infantilisants). L'interface doit être sobre, épurée, crédible, humaine et digne d'une mise en production immédiate.

---

## 1. Principes Directeurs « Anti-IA Slop » & Conception Sobre

1. **Fond Blanc Classique & Surfaces Lumineuses :**
   - Par défaut, toute interface doit reposer sur un **fond blanc pur (`#FFFFFF`)** ou un canvas ultra-clair (`#F8FAFC` / `#F9FAFB`).
   - Les cartes et conteneurs utilisent des bordures fines subtiles (`#E2E8F0` / `#E5E7EB`) et des ombres douces et réalistes, jamais de néons ou de halos lumineux violacés.
2. **Icônes Vectorielles SVG vs Zéro Sticker :**
   - **Interdiction formelle** d'utiliser des stickers 3D, des emojis colorés décoratifs ou des badges cartoon comme icônes d'interface.
   - Utiliser exclusivement des **icônes vectorielles SVG épurées en trait fin (outline 1.5px ou 2px)** (Lucide Icons, Heroicons, Phosphor ou FontAwesome monochrome).
   - Chaque icône doit avoir une fonction informative claire, jamais un rôle de simple remplissage décoratif.
3. **Sélection Intelligente de la Couleur Principale (si aucune palette n'est fournie) :**
   Si l'utilisateur ne spécifie pas de palette, **ne jamais inventer un dégradé violet**. L'IA doit composer une palette classique composée de :
   - **Fond :** Blanc (`#FFFFFF`) et gris perle (`#F8FAFC`).
   - **Texte :** Anthracite profond (`#0F172A` / `#111827`) pour un contraste et une lisibilité parfaits.
   - **Couleur d'accent unique (Primary)** déduite directement du domaine demandé :
     - *Services publics, citoyenneté, identité (type ANIP, RAVIP, démarches)* : **Bleu institutionnel régalien (`#0055A5` ou `#1D4ED8`)** ou **Vert républicain (`#0D5C3A`)**.
     - *Banque, finance, assurance, sécurité* : **Bleu marine de confiance (`#0F2942`)** ou **Vert émeraude bancaire (`#059669`)**.
     - *Santé, médical, social* : **Teal / Cyan sobre (`#0D9488`)**.
     - *Outils de productivité, SaaS, IA conversationnelle (type ChatGPT Web)* : **Noir sobre & nuances de gris ardoise (`#0F172A`)** avec accent émeraude subtil (`#10A37F`) ou bleu tech (`#2563EB`).
4. **Accessibilité WCAG 2.2 AA native :**
   - Contraste minimal de **4.5:1** pour tout texte courant.
   - Contraste minimal de **3:1** pour texte large et éléments d'interface actifs (bordures, icônes).

---

## 2. Adaptation Native aux Applications Mobiles (iOS & Android / React Native / Flutter)

Les applications mobiles requièrent des contraintes ergonomiques spécifiques différentes du desktop :

1. **Cibles Tactiles Minimales (Touch Targets) :**
   - **48dp × 48dp** (Standard Android Material Design).
   - **44pt × 44pt** (Standard iOS Human Interface Guidelines).
   - Tout bouton, interrupteur, icône d'action ou élément interactif sur mobile doit garantir cette zone minimale pour éviter les fautes de frappe au doigt.
2. **Respect des Zones Sûres (Safe Areas) :**
   - Prendre en compte systématiquement les encoches (*Notches*), la *Dynamic Island* et la barre d'accueil gestuelle inférieure (`safe-area-inset-top`, `safe-area-inset-bottom`).
3. **Ergonomie Mobile & Zone du Pouce (Thumb Zone) :**
   - Privilégier les barres de navigation inférieures (*Bottom Navigation Bar / Tab Bar*) pour les actions principales plutôt que des menus burgers inaccessibles à une main.
   - Préférer les tiroirs du bas (*Bottom Sheets / Action Sheets*) aux modales centrées de bureau pour les choix contextuels.
4. **Prévention du Zoom Involontaire :**
   - Tous les champs `<input>` doivent avoir une taille minimale de police de **16px** sur iOS pour empêcher le zoom automatique intempestif du navigateur lors de la sélection du champ.

---

## 3. Tokens Sémantiques Canoniques (Thème Clair Classique)

### 3.1 Surfaces & Fonds

| Token CSS | Variable Mobile / Tailwind | Rôle | Valeur Recommandée |
| :--- | :--- | :--- | :--- |
| `--surface-canvas` | `bg-surface-canvas` | Fond principal de l'écran / page | `#FFFFFF` |
| `--surface-card` | `bg-surface-card` | Carte, panneau, feuille mobile, modal | `#FFFFFF` |
| `--surface-subtle` | `bg-surface-subtle` | Fond secondaire, en-tête de tableau, badge | `#F8FAFC` |
| `--surface-border` | `border-slate-200` | Bordure fine de séparation | `#E2E8F0` |

### 3.2 Typographie & Contraste

| Token CSS | Variable Mobile / Tailwind | Rôle | Valeur Recommandée |
| :--- | :--- | :--- | :--- |
| `--text-primary` | `text-slate-900` | Titres, corps de texte principal, libellés | `#0F172A` (Contraste 16:1 sur blanc) |
| `--text-secondary` | `text-slate-600` | Sous-titres, aides contextuelles, légendes | `#475569` (Contraste 5.5:1 sur blanc) |
| `--text-muted` | `text-slate-400` | Placeholders désactivés, séparateurs | `#94A3B8` |
| `--text-inverse` | `text-white` | Texte sur bouton plein coloré ou foncé | `#FFFFFF` |

### 3.3 Actions & Statuts

| Rôle | Token Action | Survol / Pressé | Anneau de Focus |
| :--- | :--- | :--- | :--- |
| **Action Principale** | `--action-primary` (couleur contextuelle) | Nuance plus sombre (hover:bg-...) | Anneau 2px offset 2px (`focus-visible:ring-2`) |
| **Action Secondaire** | Fond blanc, bordure `--surface-border` | Fond `#F1F5F9` | Anneau 2px |
| **Succès** | `--feedback-success` (`#15803D`) | Surface `#F0FDF4` | Bordure `#86EFAC` |
| **Erreur / Danger** | `--feedback-danger` (`#B91C1C`) | Surface `#FEF2F2` | Bordure `#FCA5A5` |

---

## 4. Échelle d'Espacement & Grille

Unité de base : **`4px` / Grille de `8px`**.

| Token | Valeur | Usage Web & Mobile |
| :--- | :--- | :--- |
| `space-1` | `4px` | Micro-espacement, marge interne icône-texte |
| `space-2` | `8px` | Espacement entre label et champ, gap entre badges |
| `space-3` | `12px` | Padding vertical d'input tactile, marges compactes |
| `space-4` | `16px` | Marge standard sur écran mobile (gouttière d'écran), padding de carte |
| `space-6` | `24px` | Séparation entre blocs de formulaires |
| `space-8` | `32px` | Séparation de sections |

---

## 5. Exemples Comparatifs

### ❌ Anti-Pattern (Le cliché "Design IA")
```html
<!-- À BANNIR FORMELLEMENT : Fond sombre violet, dégradé fluo néon, emojis en guise d'icônes -->
<div class="bg-gradient-to-r from-purple-900 via-indigo-900 to-black text-white p-8">
  <div class="text-4xl">🚀✨🔥</div>
  <button class="bg-gradient-to-r from-pink-500 to-violet-500 shadow-purple-500/50 shadow-lg">
    Générer avec l'IA
  </button>
</div>
```

### ✅ Standard Conforme DevStandard (Inspiration ANIP / ChatGPT Web / Stripe)
```html
<!-- CONFORME : Fond blanc pur, typographie slate nette, icône SVG épurée, bouton sobre -->
<div class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
  <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
    <!-- Icône SVG sobre (pas de sticker) -->
    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
    </svg>
  </div>
  <h2 class="text-lg font-bold text-slate-900 mb-1">Demande d'acte d'état civil</h2>
  <p class="text-sm text-slate-600 mb-4">Remplissez le formulaire officiel pour obtenir votre certificat.</p>
  <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg min-h-[44px] transition focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
    Continuer la démarche
  </button>
</div>
```

---

## 6. Checklist de Validation du Développeur / Agent

- [ ] L'interface ne présente aucun fond violet néon, lueur cyberpunk ou cliché de style IA.
- [ ] Le fond principal est blanc (`#FFFFFF`) ou très clair (`#F8FAFC`).
- [ ] Aucune icône n'est un sticker 3D ou un emoji ; seules des icônes vectorielles SVG fines et monochromes sont utilisées.
- [ ] La couleur d'accent est choisie judicieusement selon le secteur d'activité (institutionnel, santé, finance, etc.).
- [ ] Sur mobile, les éléments cliquables mesurent au moins 44x44pt (iOS) ou 48x48dp (Android).
- [ ] Les zones de saisie sur mobile ont une taille de texte d'au moins 16px.
- [ ] Les encoches et zones sûres (*Safe Areas*) sont respectées.
