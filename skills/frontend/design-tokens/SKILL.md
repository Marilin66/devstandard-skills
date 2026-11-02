---
name: frontend-design-tokens
description: "Règles strictes et tokens de design pour toute interface UI : couleurs sémantiques, échelle typographique, espacement 4px/8px, contrastes WCAG 2.2 AA et gestion des états."
---

# Frontend Design Tokens & Visual System Standard

Ce skill définit le système de design canonique obligatoire pour toutes les interfaces utilisateur. Il s'inspire des systèmes de design gouvernementaux éprouvés (DSFR, GOV.UK, USWDS) et des portails de services publics (service-public.bj).

> **Règle absolue :** Aucune couleur brute, taille de police arbitraire ou espacement ad-hoc ne doit être utilisé directement dans les composants. Tout style doit référencer un token sémantique défini ci-dessous.

---

## 1. Principes Directeurs Non Négociables

1. **Tokens sémantiques stricts :** Pas de classes ou valeurs directes comme `#1E40AF` ou `text-blue-800` pour un composant métier. Utilisez `color-action-primary` ou `color-text-primary`.
2. **Accessibilité WCAG 2.2 AA native :**
   - Ratio de contraste minimum de **4.5:1** pour tout texte standard (< 18pt / 24px).
   - Ratio de contraste minimum de **3:1** pour texte large (≥ 18pt ou 14pt gras) et éléments d'interface actifs (bordures d'input, icônes d'action).
3. **Échelle d'espacement à pas de 4px / grille 8px :** Tout espacement (padding, margin, gap) découle d'une base de 4px.
4. **États interactifs complets :** Tout élément interactif possède un état défini pour : repos (`default`), survol (`hover`), focus visible (`focus-visible`), enfoncé (`active`), et désactivé (`disabled`).

---

## 2. Système de Couleurs Sémantiques

### 2.1 Surfaces & Arrière-plans

| Token CSS | Variable Tailwind / Utilitaire | Usage | Exemple Hex (Thème Clair) |
| :--- | :--- | :--- | :--- |
| `--surface-canvas` | `bg-surface-canvas` | Fond principal de l'application / page | `#F8FAFC` |
| `--surface-card` | `bg-surface-card` | Conteneur, carte, panneau, modal | `#FFFFFF` |
| `--surface-subtle` | `bg-surface-subtle` | En-têtes de tableau, zones secondaires, badges neutres | `#F1F5F9` |
| `--surface-inverse` | `bg-surface-inverse` | Infobulles, toasts sombres, bannières contrastées | `#0F172A` |

### 2.2 Textes & Typographie

| Token CSS | Variable Tailwind / Utilitaire | Usage | Exemple Hex (Thème Clair) |
| :--- | :--- | :--- | :--- |
| `--text-primary` | `text-primary` | Titres, corps de texte principal, données importantes | `#0F172A` (Contraste 15:1 sur blanc) |
| `--text-secondary` | `text-secondary` | Sous-titres, libellés d'aide, métadonnées, dates | `#475569` (Contraste 5.5:1 sur blanc) |
| `--text-muted` | `text-muted` | Textes secondaires non critiques, placeholders | `#64748B` (Contraste 4.6:1 sur blanc) |
| `--text-inverse` | `text-inverse` | Texte sur fond sombre ou bouton plein | `#FFFFFF` |

### 2.3 Actions & Rôles Interactifs

| Token CSS | Variable Tailwind / Utilitaire | Rôle |
| :--- | :--- | :--- |
| `--action-primary` | `bg-action-primary` | Bouton principal, action décisive du parcours |
| `--action-primary-hover` | `hover:bg-action-primary-hover` | Survol de l'action principale |
| `--action-primary-focus` | `focus-visible:ring-action-focus` | Anneau de focus obligatoire (minimum 2px offset 2px) |
| `--action-secondary` | `border-action-secondary` | Bouton secondaire (fond transparent, bordure forte) |
| `--action-ghost-hover` | `hover:bg-action-ghost-hover` | Bouton tertiaire / icône seule |

### 2.4 Retours d'Information & Statuts

| Rôle | Token Surface | Token Texte / Icône | Token Bordure | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Danger / Erreur** | `--feedback-danger-bg` (`#FEF2F2`) | `--feedback-danger-text` (`#991B1B`) | `--feedback-danger-border` (`#F87171`) | Erreur de formulaire, alerte critique, suppression |
| **Avertissement** | `--feedback-warning-bg` (`#FFFBEB`) | `--feedback-warning-text` (`#92400E`) | `--feedback-warning-border` (`#FBBF24`) | Action irréversible, session expirant, information vigilante |
| **Succès** | `--feedback-success-bg` (`#F0FDF4`) | `--feedback-success-text` (`#166534`) | `--feedback-success-border` (`#86EFAC`) | Confirmation de soumission, statut validé |
| **Information** | `--feedback-info-bg` (`#EFF6FF`) | `--feedback-info-text` (`#1E40AF`) | `--feedback-info-border` (`#93C5FD`) | Guide d'utilisation, précision contextuelle |

---

## 3. Échelle Typographique

Toutes les tailles doivent être exprimées en `rem` avec des hauteurs de ligne (`line-height`) adaptées garantissant la lisibilité.

| Niveau | Taille (rem / px) | Graisse (Weight) | Hauteur de ligne | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `display` | `2.5rem` (40px) | `700` (Bold) | `1.2` | En-tête héro, page d'accueil |
| `h1` | `2.0rem` (32px) | `700` (Bold) | `1.25` | Titre unique principal de la page |
| `h2` | `1.5rem` (24px) | `600` (Semibold) | `1.3` | Titre de section majeure |
| `h3` | `1.25rem` (20px) | `600` (Semibold) | `1.4` | Titre de carte, groupe de formulaires |
| `h4` | `1.125rem` (18px) | `600` (Semibold) | `1.4` | Titre de modal, sous-groupe |
| `body-base` | `1.0rem` (16px) | `400` (Regular) | `1.5` | Texte de lecture standard, inputs |
| `body-small` | `0.875rem` (14px) | `400` (Regular) | `1.5` | Libellés d'aide, badges, métadonnées |
| `caption` | `0.75rem` (12px) | `500` (Medium) | `1.4` | Mentions légales, horodatages |

---

## 4. Échelle d'Espacement & Grille

Unité de base : **`4px` (0.25rem)**.

| Token | Valeur | Usage recommandé |
| :--- | :--- | :--- |
| `space-1` | `4px` | Écartement interne d'icônes dans boutons, micro-espacement |
| `space-2` | `8px` | Gap entre label et champ, gap entre boutons compacts |
| `space-3` | `12px` | Padding interne des inputs de formulaire, badges |
| `space-4` | `16px` | Padding interne des cartes simples, marges d'éléments liés |
| `space-6` | `24px` | Espacement entre groupes de champs d'un formulaire, padding de cartes |
| `space-8` | `32px` | Séparation entre sections d'un même contenu |
| `space-12` | `48px` | Espacement majeur entre blocs fonctionnels de la page |

### Conteneurs de Lecture :
- `max-w-prose` (~65-75 caractères) pour le texte de lecture continue.
- `max-w-xl` (576px - 640px) pour les formulaires de saisie en colonne unique.

---

## 5. Exemples d'Application

### ❌ Mauvaise Pratique (Anti-pattern)
```html
<!-- INTERDIT : Valeurs brutes, pas d'accessibilité de focus, contraste incertain -->
<button style="background: #0070f3; color: #fff; padding: 10px 15px; border-radius: 5px;">
  Envoyer
</button>
```

### ✅ Bonne Pratique (Conforme DevStandard)
```html
<!-- CONFORME : Tokens sémantiques, échelle 4px/8px, focus-visible obligatoire -->
<button class="bg-[var(--action-primary)] text-[var(--text-inverse)] hover:bg-[var(--action-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--action-primary-focus)] px-4 py-2.5 rounded-md font-medium transition-colors">
  Envoyer
</button>
```

---

## 6. Checklist de Validation du Développeur / Agent

Avant de considérer une interface conforme :
- [ ] Aucun code couleur hexadécimal brut n'est codé en dur dans les composants.
- [ ] Tout texte régulier a un contraste supérieur ou égal à 4.5:1 avec son arrière-plan.
- [ ] L'anneau de focus (`focus-visible`) est visible à la navigation clavier sur tous les boutons, liens et inputs.
- [ ] Les espacements verticaux et horizontaux utilisent exclusivement la grille 4px/8px.
- [ ] Les messages d'erreur ou d'alerte n'utilisent pas uniquement la couleur pour transmettre l'information (présence obligatoire d'une icône et d'un texte clair).
