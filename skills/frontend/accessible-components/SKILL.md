---
name: frontend-accessible-components
description: "Règles strictes de construction des composants interactifs : distinction bouton/lien, modales avec capture du focus (focus-trap), menus accessibles, et tableaux de données avec pagination et tri."
---

# Frontend Accessible Components Standard

Ce skill formalise les exigences pour la conception et l'implémentation des composants interactifs fondamentaux d'une interface utilisateur, garantissant une utilisabilité universelle et une conformité stricte aux standards W3C WAI-ARIA.

---

## 1. Règles Non Négociables d'Interactivité

1. **Distinction formelle Bouton vs Lien :**
   - Un lien (`<a>` ou composant `<Link>`) sert **uniquement** à naviguer vers une autre URL ou ancre. Il possède obligatoirement un attribut `href`.
   - Un bouton (`<button>`) sert **exclusivement** à déclencher une action (soumettre, ouvrir une boîte de dialogue, fermer un panneau, supprimer un élément).
   - **Interdiction formelle** de créer un bouton avec `<div onClick="...">` ou `<a href="#">`.
2. **Navigation et contrôle au clavier :**
   - Tout composant manipulable à la souris doit être manipulable à 100% au clavier (`Tab`, `Maj+Tab`, `Entrée`, `Espace`, touches fléchées, `Échap`).
   - L'ordre de tabulation dans le DOM doit refléter l'ordre visuel naturel de lecture.
3. **Retour visuel de focus permanent :**
   - Ne jamais supprimer le contour de focus (`outline: none`) sans le remplacer par un anneau visible à fort contraste (`focus-visible:ring-2`).

---

## 2. Spécification des Composants Critiques

### 2.1 Boîtes de Dialogue & Modales (`Dialog / Modal`)
Toute modale doit respecter le pattern ARIA Dialog :
- **Attributs requis :** `role="dialog"`, `aria-modal="true"`, et `aria-labelledby` pointant vers le titre du dialogue.
- **Gestion du Focus (Focus Trap) :**
  - À l'ouverture : le focus est automatiquement déplacé vers le premier élément interactif (ou le bouton de fermeture).
  - Pendant que la modale est ouverte : la touche `Tab` doit boucler à l'intérieur de la modale sans jamais s'échapper vers l'arrière-plan.
  - À la fermeture : le focus doit revenir exactement sur l'élément déclencheur initial.
- **Fermeture prévisible :** Touche `Échap` (`Escape`) et clic sur l'arrière-plan semi-transparent doivent fermer la modale.
- **Verrouillage du défilement :** Le défilement de l'arrière-plan (`body`) doit être suspendu tant que la modale est visible.

### 2.2 Tableaux de Données (`Data Tables`)
Inspiré des portails administratifs et de gestion de données :
- Structure sémantique obligatoire : `<table>`, `<thead>`, `<tbody>`, `<th>` (avec attribut `scope="col"` ou `scope="row"`).
- **En-têtes triables :** Si une colonne est triable, l'en-tête doit comporter un `<button>` indiquant l'état courant via `aria-sort="ascending"`, `aria-sort="descending"` ou `aria-sort="none"`.
- **Adaptabilité mobile :** Sur petit écran, le tableau doit soit offrir un défilement horizontal contenu (`overflow-x-auto`) avec indicateur visuel, soit se restructurer sous forme de cartes d'informations.
- **Pagination accessible :** Les boutons Précédent/Suivant et numéros de page doivent être dans une balise `<nav aria-label="Pagination">`, avec la page courante identifiée par `aria-current="page"`.

### 2.3 Menus Déroulants & Menus de Navigation
- Ne jamais afficher un sous-menu uniquement au survol de la souris (`hover`) : il doit s'ouvrir au clic ou à l'activation clavier (`Espace` / `Entrée`).
- Attribut `aria-expanded="true|false"` obligatoire sur le bouton déclencheur.
- Fermeture automatique à l'appui sur la touche `Échap` ou lors d'un clic extérieur.

---

## 3. Checklist de Validation du Développeur / Agent

- [ ] Tous les éléments cliquables utilisent les balises natives appropriées (`<button>` pour les actions, `<a>` pour la navigation).
- [ ] Les boîtes de dialogue capturent le focus clavier et se ferment à la touche `Échap`.
- [ ] Les sous-menus et accordéons signalent leur état d'ouverture avec `aria-expanded`.
- [ ] Les tableaux comportent des en-têtes balisés avec `scope` et gèrent le tri sans perdre le focus.
- [ ] Aucun composant ne dépend exclusivement d'un mouvement de souris ou d'un glisser-déposer sans alternative clavier.
