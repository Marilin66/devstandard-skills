---
name: frontend-design-tokens
description: "Règles strictes de design sans cliché IA : fond blanc classique, suppression des stickers au profit d'icônes vectorielles SVG sobres, matrice typographique institutionnelle, palettes sectorielles multi-tons (État, Finance, Santé, Data, Tech), contrastes WCAG 2.2 AA et adaptation native aux applications web et mobiles (iOS/Android)."
---

# Frontend Design Tokens & Human-Crafted Visual System Standard

Ce skill définit le système de design visuel obligatoire pour toutes les interfaces utilisateur (Web et Applications Mobiles). Il s'inspire directement des systèmes de design de confiance et de haute fiabilité : les portails institutionnels (ANIP Bénin, RAVIP, e-services.anip.bj, service-public.bj, DSFR France, GOV.UK, USWDS, Canada.ca, gov.sg, ONU, Banque Mondiale, ONS) et les interfaces modernes épurées (ChatGPT Web, Stripe, Linear).

> **Règle d'or « Zéro Cliché IA » :** Une interface générée ne doit **JAMAIS** ressembler à une maquette d'IA générique (pas de dégradés néon violets/magenta, pas de fonds sombres futuristes clichés, pas d'emojis ou stickers décoratifs infantilisants). L'interface doit être sobre, épurée, crédible, humaine et digne d'une mise en production immédiate.

---

## 1. Principes Directeurs « Anti-IA Slop » & Conception Sobre

1. **Fond Blanc Classique & Surfaces Lumineuses :**
   - Par défaut, toute interface repose sur un **fond blanc pur (`#FFFFFF`)** ou un canvas ultra-clair (`#F8FAFC` / `#F9FAFB`).
   - Les cartes et conteneurs utilisent des bordures fines subtiles (`#E2E8F0`) et des ombres douces réalistes, jamais de néons ou de halos lumineux violacés.

2. **Icônes Vectorielles SVG vs Zéro Sticker :**
   - **Interdiction formelle** d'utiliser des stickers 3D, des emojis colorés décoratifs ou des badges cartoon comme icônes d'interface.
   - Utiliser exclusivement des **icônes vectorielles SVG épurées en trait fin (outline 1.5px ou 2px)** (Lucide Icons, Heroicons, Phosphor ou FontAwesome monochrome).
   - Chaque icône doit avoir une fonction informative claire, jamais un rôle de simple remplissage décoratif.

3. **Accessibilité WCAG 2.2 AA native :**
   - Contraste minimal de **4.5:1** pour tout texte courant.
   - Contraste minimal de **3:1** pour texte large et éléments d'interface actifs (bordures, icônes).

4. **La couleur est choisie par secteur, jamais au hasard :**
   - L'IA ne doit jamais inventer une couleur sans justification sectorielle.
   - La palette est toujours multi-tons (fond, texte, primaire, secondaire, accent, neutres).
   - Voir la Section 2 (typographie) et la Section 3 (palettes sectorielles) pour l'algorithme de choix.

---

## 2. Matrice Typographique Institutionnelle de Référence

### 2.1 Tableau des Paires Typographiques par Institution

Si aucune police n'est spécifiée par le client, l'IA **DOIT** choisir la paire de polices correspondant au secteur d'activité dans cette matrice — jamais une police générique ou une police par défaut du système.

| Institution de Référence | Police de Titrage (Headings) | Police de Corps (Body Text) | Style Général & Vibe |
| :--- | :--- | :--- | :--- |
| [Portail National du Bénin (gouv.bj)](https://www.gouv.bj/) | **Montserrat** | Montserrat / Sans-serif | Moderne, géométrique et institutionnel épuré |
| [Système de Design de l'État Français (DSFR)](https://www.systeme-de-design.gouv.fr/) | **Marianne** | Spectral | Contraste élégant entre linéale (titre) et égyptienne/sérif (lecture) |
| [US Web Design System (USWDS)](https://designsystem.digital.gov/) | **Public Sans** | Merriweather | Équilibre parfait entre lisibilité technique et confort de lecture long format |
| [GOV.UK (Royaume-Uni)](https://brand.design-system.service.gov.uk/typography/) | **GDS Transport** | GDS Transport / Arial | Ultra-fonctionnel, inspiré de la signalétique routière britannique |
| [Gouvernement du Canada](https://www.canada.ca/fr.html) | **Noto Sans** | Arial / Sans-serif | Universel, neutre et hautement accessible (multi-langues) |
| Union Européenne (Europa) | **Inter / Arial** | Inter / Sans-serif | Corporate contemporain, axé sur la clarté des interfaces denses |
| [Gouvernement de Singapour (gov.sg)](https://www.gov.sg/) | **Open Sans** | Lato / Sans-serif | Approche moderne, très axée « tech » et lisibilité sur écrans mobiles |
| [Organisation des Nations Unies (ONU)](https://www.un.org/fr/) | **Roboto** | Open Sans / Roboto | Neutre, journalistique et standardisé à l'échelle internationale |
| Banque Mondiale | **Inter** | Georgia | Hybride expert (titre très net d'interface + corps sérif de rapport d'analyse) |
| [Office for National Statistics — ONS (UK)](https://service-manual.ons.gov.uk/) | **Open Sans** | Open Sans / Noto Sans | Minimaliste et scientifique, optimisé pour la data et les chiffres |

### 2.2 Règles d'Application Typographique

- **`font-display: swap`** est obligatoire pour toutes les polices web chargées via Google Fonts ou un CDN.
- **Ne jamais charger plus de 2 familles de polices** (1 pour les titres, 1 pour le corps).
- Toutes les polices doivent être chargées dans les graisses strictement nécessaires (généralement 400, 600, 700) pour minimiser le poids de page.
- Si la police institutionnelle n'est pas disponible gratuitement (ex : GDS Transport, Marianne), utiliser le fallback indiqué ou son équivalent Google Fonts le plus proche.

```html
<!-- Exemple de chargement Google Fonts conforme (Montserrat — secteur État africain) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
```

```css
/* Fallback stack recommandé si la police institutionnelle est absente */
--font-heading: 'Montserrat', 'Public Sans', 'Open Sans', Arial, sans-serif;
--font-body:    'Montserrat', 'Open Sans', Arial, sans-serif;
```

### 2.3 Correspondance Secteur → Paire Typographique

| Secteur | Paire Typographique Recommandée | Justification |
| :--- | :--- | :--- |
| État / Administration africaine francophone | Montserrat + Montserrat | Référence directe gouv.bj, ANIP, RAVIP |
| Administration française / Europe | Marianne + Spectral (ou Inter + Inter) | DSFR, portails EU |
| Administration anglosaxonne / Internationale | Public Sans + Merriweather ou Noto Sans + Arial | USWDS, Canada.ca, GOV.UK |
| Finance / Banque / Assurance | Inter + Georgia | Hybride autorité + lecture sérif (Banque Mondiale) |
| Santé / Social / Médical | Open Sans + Open Sans | Lisible, accessible, neutre — pas de sérif agressif |
| Données / Statistiques / Recherche | Open Sans + Noto Sans | ONS, data-centric, scientifique |
| Technologie / SaaS / Productivity | Inter + Inter | EU/Singapour, ChatGPT Web, Stripe, Linear |

---

## 3. Palettes de Couleurs Institutionnelles par Secteur

### 3.1 Algorithme de Choix de Palette (si aucune n'est fournie)

L'IA doit appliquer cet algorithme dans l'ordre suivant :

1. **Identifier le secteur d'activité** à partir du brief ou du nom du projet.
2. **Sélectionner la paire typographique** correspondante dans la matrice Section 2.3.
3. **Appliquer la palette sectorielle** définie ci-dessous (Section 3.2 à 3.8).
4. **Ne jamais choisir violet/magenta/purple** comme couleur principale, sauf demande explicite et justifiée du client.
5. **Ne jamais générer un fond sombre** sauf si le client demande explicitement un mode sombre.
6. Si le secteur est ambigu, **préférer une palette neutre institutionnelle** (bleu marine + blanc + gris ardoise).

### 3.2 Services Publics / État Africain Francophone

> **Inspiration :** ANIP Bénin, RAVIP, e-services.anip.bj, service-public.bj, gouv.bj

| Rôle | Token | Valeur | Notes |
| :--- | :--- | :--- | :--- |
| Fond Principal | `--surface-canvas` | `#FFFFFF` | Blanc pur |
| Fond Secondaire | `--surface-subtle` | `#F0F7F0` | Vert très clair, respire la fiabilité |
| Texte Primaire | `--text-primary` | `#0D2B0D` | Vert-noir profond, lisibilité maximale |
| Texte Secondaire | `--text-secondary` | `#3D5A3E` | Vert ardoise, aide contextuelle |
| Couleur Principale | `--color-primary` | `#006E35` | Vert républicain du Bénin |
| Couleur Secondaire | `--color-secondary` | `#FFC107` | Jaune or (drapeau) — utilisé pour badges, alertes |
| Accent / CTA | `--color-accent` | `#004D25` | Vert foncé pour hover, focus, boutons actifs |
| Bordure | `--surface-border` | `#C8E6C9` | Vert clair discret |
| Erreur | `--feedback-danger` | `#B91C1C` | Rouge standard |
| Succès | `--feedback-success` | `#15803D` | Vert succès |

**Typographie :** Montserrat 700 (titres) + Montserrat 400 (corps)

---

### 3.3 Administration Française / Europe Francophone

> **Inspiration :** DSFR (design.numerique.gouv.fr), portails UE, Élysée, Sénat

| Rôle | Token | Valeur | Notes |
| :--- | :--- | :--- | :--- |
| Fond Principal | `--surface-canvas` | `#FFFFFF` | Blanc pur |
| Fond Secondaire | `--surface-subtle` | `#F5F6FA` | Gris bleu très clair (DSFR standard) |
| Texte Primaire | `--text-primary` | `#161616` | Quasi-noir DSFR |
| Texte Secondaire | `--text-secondary` | `#3A3A3A` | Gris texte DSFR |
| Couleur Principale | `--color-primary` | `#000091` | Bleu DSFR (bleu Marianne officiel) |
| Couleur Secondaire | `--color-secondary` | `#E1000F` | Rouge Marianne officiel |
| Accent / CTA | `--color-accent` | `#1212FF` | Bleu lumineux DSFR hover |
| Bordure | `--surface-border` | `#CECECE` | Gris bordure DSFR |
| Fond Badge Info | `--info-surface` | `#E8EDFF` | Bleu très clair |
| Erreur | `--feedback-danger` | `#E10600` | Rouge DSFR |
| Succès | `--feedback-success` | `#18753C` | Vert succès DSFR |

**Typographie :** Marianne 700 (titres) + Spectral 400 (corps) — ou Inter si Marianne non disponible

---

### 3.4 Administration Anglosaxonne / Internationale

> **Inspiration :** GOV.UK, USWDS (USA), Canada.ca, gov.sg, ONU

| Rôle | Token | Valeur | Notes |
| :--- | :--- | :--- | :--- |
| Fond Principal | `--surface-canvas` | `#FFFFFF` | Blanc pur |
| Fond Secondaire | `--surface-subtle` | `#F3F4F6` | Gris neutre très clair |
| Texte Primaire | `--text-primary` | `#0B0C0C` | Quasi-noir GOV.UK |
| Texte Secondaire | `--text-secondary` | `#505A5F` | Gris moyen fonctionnel |
| Couleur Principale | `--color-primary` | `#1D4ED8` | Bleu institutionnel international |
| Couleur Secondaire | `--color-secondary` | `#0F2942` | Marine profond (autorité, confiance) |
| Accent / CTA | `--color-accent` | `#FFD700` | Or GOV.UK (badge, lien focus) |
| Bordure | `--surface-border` | `#B1B4B6` | Gris bordure GOV.UK |
| Focus Ring | `--focus-ring` | `#FFBF47` | Jaune moutarde focus GOV.UK (WCAG) |
| Erreur | `--feedback-danger` | `#D4351C` | Rouge GOV.UK |
| Succès | `--feedback-success` | `#00703C` | Vert GOV.UK |

**Typographie :** Public Sans 700 + Merriweather 400 (USA) / Noto Sans 700 + Arial 400 (Canada/ONU)

---

### 3.5 Finance / Banque / Assurance / Légal

> **Inspiration :** Banque Mondiale, BNP Paribas, Société Générale, Allianz, OGE, CIMA

| Rôle | Token | Valeur | Notes |
| :--- | :--- | :--- | :--- |
| Fond Principal | `--surface-canvas` | `#FFFFFF` | Blanc pur |
| Fond Secondaire | `--surface-subtle` | `#F8F9FB` | Gris perle financier |
| Texte Primaire | `--text-primary` | `#0F2942` | Marine profond, sérieux |
| Texte Secondaire | `--text-secondary` | `#4A6080` | Bleu-gris, discrédibilité |
| Couleur Principale | `--color-primary` | `#0F2942` | Bleu marine de confiance bancaire |
| Couleur Secondaire | `--color-secondary` | `#1E5799` | Bleu moyen interactif |
| Accent / CTA | `--color-accent` | `#B8860B` | Or discret (premium, non fluo) |
| Bordure | `--surface-border` | `#D0D7E2` | Gris bleu clair |
| Badge Premium | `--badge-premium` | `#FDF6E3` | Fond or très clair pour indicateurs |
| Erreur | `--feedback-danger` | `#C0392B` | Rouge sobre |
| Succès | `--feedback-success` | `#1A7740` | Vert validation financière |

**Typographie :** Inter 700 (titres) + Georgia 400 (corps rapport) — référence Banque Mondiale

---

### 3.6 Santé / Social / Médical / Humanitaire

> **Inspiration :** OMS, MSF, Ministère de la Santé, SAMU Social, systèmes hospitaliers

| Rôle | Token | Valeur | Notes |
| :--- | :--- | :--- | :--- |
| Fond Principal | `--surface-canvas` | `#FFFFFF` | Blanc clinique pur |
| Fond Secondaire | `--surface-subtle` | `#F0FDFA` | Teal très clair, frais et sain |
| Texte Primaire | `--text-primary` | `#134E4A` | Vert-teal foncé, lisible et sobre |
| Texte Secondaire | `--text-secondary` | `#2D6A65` | Teal moyen |
| Couleur Principale | `--color-primary` | `#0D9488` | Teal médical sobre |
| Couleur Secondaire | `--color-secondary` | `#0F766E` | Teal foncé (hover, icônes actives) |
| Accent / CTA | `--color-accent` | `#14B8A6` | Teal clair lumineux (CTA) |
| Bordure | `--surface-border` | `#CCFBF1` | Teal très clair |
| Urgence | `--feedback-danger` | `#DC2626` | Rouge urgence médical |
| Confirmation | `--feedback-success` | `#059669` | Vert conforme |

**Typographie :** Open Sans 700 (titres) + Open Sans 400 (corps) — lisibilité maximale, neutre

---

### 3.7 Données / Statistiques / Recherche / Science

> **Inspiration :** ONS (UK), INSEE, Eurostat, data.gouv.fr, Google Scholar, Our World in Data

| Rôle | Token | Valeur | Notes |
| :--- | :--- | :--- | :--- |
| Fond Principal | `--surface-canvas` | `#FFFFFF` | Blanc ultra-propre scientifique |
| Fond Secondaire | `--surface-subtle` | `#F6F8FA` | Gris très clair (GitHub-style) |
| Texte Primaire | `--text-primary` | `#1A1A2E` | Ardoise très foncée |
| Texte Secondaire | `--text-secondary` | `#4B5563` | Gris moyen neutre |
| Couleur Principale | `--color-primary` | `#2563EB` | Bleu data neutre et précis |
| Couleur Secondaire | `--color-secondary` | `#475569` | Gris ardoise fonctionnel |
| Accent Graphique | `--color-accent` | `#0EA5E9` | Bleu ciel (pour graphiques, highlights) |
| Bordure | `--surface-border` | `#E5E7EB` | Gris clair standard |
| Fond Tableau | `--table-header` | `#F9FAFB` | Gris très subtil pour en-têtes |
| Erreur | `--feedback-danger` | `#EF4444` | Rouge standard |
| Succès | `--feedback-success` | `#22C55E` | Vert standard |

**Typographie :** Open Sans 700 (titres) + Open Sans 400 / Noto Sans 400 (corps) — référence ONS

---

### 3.8 Technologie / SaaS / Productivité / IA Conversationnelle

> **Inspiration :** ChatGPT Web, Stripe, Linear, Vercel, Notion, GitHub, Figma

| Rôle | Token | Valeur | Notes |
| :--- | :--- | :--- | :--- |
| Fond Principal | `--surface-canvas` | `#FFFFFF` | Blanc pur |
| Fond Secondaire | `--surface-subtle` | `#F8FAFC` | Slate-50, propre et moderne |
| Texte Primaire | `--text-primary` | `#0F172A` | Slate-900, contraste parfait |
| Texte Secondaire | `--text-secondary` | `#475569` | Slate-600, aide contextuelle |
| Couleur Principale | `--color-primary` | `#10A37F` | Vert émeraude ChatGPT (IA positive) |
| Alt. Couleur Principale | `--color-primary-alt` | `#2563EB` | Bleu tech (Stripe, Vercel, GitHub) |
| Couleur Secondaire | `--color-secondary` | `#1E293B` | Slate-800, surface sombre subtile |
| Accent / CTA | `--color-accent` | `#0EA5E9` | Bleu ciel lumineux (sky-500) |
| Bordure | `--surface-border` | `#E2E8F0` | Slate-200 |
| Erreur | `--feedback-danger` | `#EF4444` | Rouge standard |
| Succès | `--feedback-success` | `#22C55E` | Vert standard |

> **Note :** Pour ce secteur, le choix entre vert émeraude et bleu tech dépend du produit :
> - **IA / Conversation / Assistant** → Vert émeraude (`#10A37F`)
> - **Dev tools / Infrastructure / B2B SaaS** → Bleu tech (`#2563EB`)

**Typographie :** Inter 700 (titres) + Inter 400 (corps) — référence EU/Singapour/Stripe

---

## 4. Tokens Sémantiques Canoniques (Thème Clair)

### 4.1 Surfaces & Fonds

| Token CSS | Variable Mobile / Tailwind | Rôle | Valeur Recommandée |
| :--- | :--- | :--- | :--- |
| `--surface-canvas` | `bg-white` | Fond principal de l'écran / page | `#FFFFFF` |
| `--surface-card` | `bg-white` | Carte, panneau, feuille mobile, modal | `#FFFFFF` |
| `--surface-subtle` | `bg-slate-50` | Fond secondaire, en-tête de tableau, badge | `#F8FAFC` |
| `--surface-border` | `border-slate-200` | Bordure fine de séparation | `#E2E8F0` |

### 4.2 Typographie & Contraste

| Token CSS | Variable Mobile / Tailwind | Rôle | Valeur Recommandée |
| :--- | :--- | :--- | :--- |
| `--text-primary` | `text-slate-900` | Titres, corps de texte principal, libellés | `#0F172A` (Contraste 16:1 sur blanc) |
| `--text-secondary` | `text-slate-600` | Sous-titres, aides contextuelles, légendes | `#475569` (Contraste 5.5:1 sur blanc) |
| `--text-muted` | `text-slate-400` | Placeholders désactivés, séparateurs | `#94A3B8` |
| `--text-inverse` | `text-white` | Texte sur bouton plein coloré ou foncé | `#FFFFFF` |

### 4.3 Actions & Statuts

| Rôle | Token Action | Survol / Pressé | Anneau de Focus |
| :--- | :--- | :--- | :--- |
| **Action Principale** | `--action-primary` (couleur contextuelle sectorielle) | Nuance 10% plus sombre | Anneau 2px offset 2px (`focus-visible:ring-2`) |
| **Action Secondaire** | Fond blanc, bordure `--surface-border` | Fond `#F1F5F9` | Anneau 2px |
| **Succès** | `--feedback-success` (`#15803D`) | Surface `#F0FDF4` | Bordure `#86EFAC` |
| **Erreur / Danger** | `--feedback-danger` (`#B91C1C`) | Surface `#FEF2F2` | Bordure `#FCA5A5` |

---

## 5. Adaptation Native aux Applications Mobiles (iOS & Android / React Native / Flutter)

1. **Cibles Tactiles Minimales (Touch Targets) :**
   - **48dp × 48dp** (Standard Android Material Design).
   - **44pt × 44pt** (Standard iOS Human Interface Guidelines).
   - Tout bouton, interrupteur, icône d'action ou élément interactif sur mobile doit garantir cette zone minimale.

2. **Respect des Zones Sûres (Safe Areas) :**
   - Prendre en compte systématiquement les encoches (*Notches*), la *Dynamic Island* et la barre d'accueil gestuelle inférieure (`safe-area-inset-top`, `safe-area-inset-bottom`).

3. **Ergonomie Mobile & Zone du Pouce (Thumb Zone) :**
   - Privilégier les barres de navigation inférieures (*Bottom Navigation Bar / Tab Bar*) pour les actions principales plutôt que des menus burgers inaccessibles à une main.
   - Préférer les tiroirs du bas (*Bottom Sheets*) aux modales centrées desktop pour les choix contextuels.

4. **Prévention du Zoom Involontaire :**
   - Tous les champs `<input>` doivent avoir une taille minimale de police de **16px** sur iOS.

---

## 6. Échelle d'Espacement & Grille

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

## 7. Exemples Comparatifs

### ❌ Anti-Pattern (Le cliché « Design IA »)
```html
<!-- À BANNIR FORMELLEMENT : Fond sombre violet, dégradé fluo néon, emojis en guise d'icônes -->
<div class="bg-gradient-to-r from-purple-900 via-indigo-900 to-black text-white p-8">
  <div class="text-4xl">🚀✨🔥</div>
  <button class="bg-gradient-to-r from-pink-500 to-violet-500 shadow-purple-500/50 shadow-lg">
    Générer avec l'IA
  </button>
</div>
```

### ✅ Exemple Conforme — Secteur État Africain (ANIP / RAVIP)
```html
<!-- CONFORME : Fond blanc, vert républicain, police Montserrat, icône SVG sobre -->
<div class="bg-white border border-green-100 rounded-xl p-6 shadow-sm">
  <div class="w-10 h-10 rounded-lg bg-green-50 text-green-800 flex items-center justify-center mb-4">
    <!-- Icône SVG sobre (pas de sticker) -->
    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
    </svg>
  </div>
  <h2 style="font-family:'Montserrat',sans-serif" class="text-lg font-bold text-green-900 mb-1">
    Demande d'acte d'état civil
  </h2>
  <p class="text-sm text-green-700 mb-4">Remplissez le formulaire officiel pour obtenir votre certificat.</p>
  <button class="bg-[#006E35] hover:bg-[#004D25] text-white font-medium px-4 py-2.5 rounded-lg
    min-h-[44px] transition focus-visible:ring-2 focus-visible:ring-[#006E35] focus-visible:ring-offset-2">
    Continuer la démarche
  </button>
</div>
```

### ✅ Exemple Conforme — Secteur Finance / Banque
```html
<!-- CONFORME : Marine profond, or discret, Inter, icône SVG sobre -->
<div class="bg-white border border-[#D0D7E2] rounded-xl p-6 shadow-sm">
  <div class="w-10 h-10 rounded-lg bg-[#F8F9FB] text-[#0F2942] flex items-center justify-center mb-4">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
    </svg>
  </div>
  <h2 style="font-family:'Inter',sans-serif" class="text-lg font-bold text-[#0F2942] mb-1">
    Virement bancaire sécurisé
  </h2>
  <p class="text-sm text-[#4A6080] mb-4">Vos fonds sont protégés par un chiffrement TLS 1.3.</p>
  <button class="bg-[#0F2942] hover:bg-[#1E5799] text-white font-medium px-4 py-2.5 rounded-lg
    min-h-[44px] transition focus-visible:ring-2 focus-visible:ring-[#1E5799] focus-visible:ring-offset-2">
    Confirmer le virement
  </button>
</div>
```

---

## 8. Checklist de Validation du Développeur / Agent

- [ ] L'interface ne présente aucun fond violet néon, lueur cyberpunk ou cliché de style IA.
- [ ] Le fond principal est blanc (`#FFFFFF`) ou très clair (`#F8FAFC`).
- [ ] La couleur principale est choisie selon le secteur d'activité identifié (Section 3).
- [ ] La palette est multi-tons : fond, texte primaire, texte secondaire, primaire, secondaire, accent, bordure.
- [ ] La paire typographique est choisie dans la matrice institutionnelle (Section 2.1).
- [ ] Les polices sont chargées avec `font-display: swap`.
- [ ] Aucune icône n'est un sticker 3D ou un emoji ; seules des icônes vectorielles SVG fines et monochromes sont utilisées.
- [ ] Les ratios de contraste respectent WCAG 2.2 AA (4.5:1 texte courant, 3:1 éléments UI).
- [ ] Sur mobile, les éléments cliquables mesurent au moins 44×44pt (iOS) ou 48×48dp (Android).
- [ ] Les zones de saisie sur mobile ont une taille de texte d'au moins 16px.
- [ ] Les encoches et zones sûres (*Safe Areas*) sont respectées.
- [ ] `focus-visible:ring-2` avec offset est présent sur tous les éléments interactifs.
