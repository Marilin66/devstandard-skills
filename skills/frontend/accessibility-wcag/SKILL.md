---
name: frontend-accessibility-wcag
description: "Règles normatives d'accessibilité numérique selon le standard WCAG 2.2 niveau AA : contrastes, sémantique HTML, navigation clavier, alternatives textuelles, zoom 200% et prefers-reduced-motion."
---

# Frontend Accessibility (WCAG 2.2 AA) Standard

Ce skill formalise les règles obligatoires d'accessibilité numérique pour garantir qu'aucune personne en situation de handicap (visuel, moteur, cognitif ou auditif) ne soit exclue de l'utilisation du service.

---

## 1. Principes Majeurs (WCAG 2.2 Niveau AA)

### 1.1 Ratios de Contraste Visuel (Critère 1.4.3 & 1.4.11)
- **Texte normal (< 24px ou < 19px gras) :** Ratio de contraste minimal de **4.5:1** contre son arrière-plan.
- **Texte large (≥ 24px ou ≥ 19px gras) :** Ratio de contraste minimal de **3.0:1**.
- **Composants d'interface & icônes fonctionnelles :** Ratio de contraste minimal de **3.0:1** (bordures d'inputs, barres d'outils, boutons d'action).
- **Indépendance de la couleur (Critère 1.4.1) :** La couleur ne doit jamais être le seul vecteur d'information. Les liens dans un bloc de texte doivent être soulignés ou posséder un contraste supplémentaire et une distinction typographique.

### 1.2 Alternatives Textuelles pour les Médias (Critère 1.1.1)
- Toute balise `<img>` doit posséder un attribut `alt`.
  - Si l'image est informative : `alt="Description concise du contenu informatif"`.
  - Si l'image est purement décorative : `alt=""` et `aria-hidden="true"` afin que le lecteur d'écran l'ignore.
- Les boutons contenant uniquement une icône doivent posséder un libellé accessible :
  ```html
  <button aria-label="Fermer la fenêtre">
    <svg aria-hidden="true" ...></svg>
  </button>
  ```

### 1.3 Structure Sémantique & Repères (Landmarks)
- Utiliser la hiérarchie stricte des balises structurelles : `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`.
- Il ne doit y avoir **qu'un seul `<h1>`** par page représentant le sujet principal de la vue.
- La hiérarchie des niveaux de titres (`h1` à `h6`) ne doit jamais sauter de niveau (ex: passer de `h2` directement à `h4` pour des raisons esthétiques est interdit).

### 1.4 Redimensionnement & Zoom sans Perte (Critère 1.4.4 & 1.4.10)
- L'interface doit rester utilisable et lisible jusqu'à un zoom de **200%** dans le navigateur sans perte de contenu ni de fonctionnalité.
- Ne jamais désactiver le zoom utilisateur sur mobile dans la balise meta viewport (`maximum-scale=1.0` ou `user-scalable=no` sont strictement interdits).

### 1.5 Préférence de Réduction de Mouvement (`prefers-reduced-motion`)
- Toutes les animations de transition, de défilement doux ou de parallaxe doivent respecter le paramètre d'accessibilité système :
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

---

## 2. Checklist d'Audit WCAG 2.2 AA

- [ ] L'ensemble des fonctionnalités est testable et utilisable sans aucune souris (navigation au clavier seul).
- [ ] L'ordre de focus suit l'ordre logique de lecture du document.
- [ ] Aucun composant ne piège involontairement le focus au clavier.
- [ ] Le zoom à 200% n'engendre aucun chevauchement de texte ni de bouton inaccessible.
- [ ] Les icônes fonctionnelles ont un `aria-label` ou un texte caché `.sr-only`.
- [ ] Les champs en erreur disposent de `aria-invalid="true"` et d'une annonce vocale accessible.
