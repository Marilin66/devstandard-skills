---
name: frontend-responsive-layouts
description: "Standards de conception d'interfaces responsives : approche mobile-first, points de rupture stricts, prévention du débordement horizontal (scroll horizontal involontaire) et adaptation des tableaux et formulaires."
---

# Frontend Responsive Layouts Standard

Ce skill formalise les exigences pour concevoir des interfaces web fluides, s'adaptant parfaitement de l'écran mobile le plus modeste (320px) jusqu'aux écrans larges de bureau (1920px+).

---

## 1. Principes Non Négociables de Responsive Design

1. **Stratégie Mobile-First stricte :**
   - Écrire d'abord le style pour la vue mobile par défaut (sans media query).
   - Utiliser des requêtes avec `min-width` pour enrichir la mise en page à mesure que l'écran s'élargit (`sm:`, `md:`, `lg:`, `xl:`). Ne pas concevoir pour desktop d'abord puis bricoler avec des `max-width` régressifs.
2. **Tolérance Zéro pour le Débordement Horizontal Involontaire :**
   - Aucune page, dialogue ou composant ne doit provoquer de barre de défilement horizontale involontaire (`horizontal scrollbar`) sur le conteneur principal (`body` / `html`).
   - Tester impérativement sur une largeur minimale de **320px** (smartphones compacts).
3. **Cibles tactiles conformes (WCAG 2.2 - Cible minimale 44x44px) :**
   - Tout élément cliquable ou touchable sur mobile (boutons, icônes, liens de navigation, cases à cocher) doit offrir une surface interactive minimale de **44px × 44px** pour éviter les erreurs de manipulation tactile.

---

## 2. Grille & Points de Rupture (Breakpoints)

Les largeurs d'écran cibles doivent suivre les seuils canoniques standard :

| Point de rupture | Largeur minimale | Contexte visuel | Comportement attendu |
| :--- | :--- | :--- | :--- |
| **`xs` (Mobile compact)** | `320px` - `639px` | Smartphone 1 colonne | Navigation en tiroir/menu repliable, formulaires pleine largeur, marges compactes (16px). |
| **`sm` (Grand mobile)** | `640px` | Grand smartphone | Grilles à 2 colonnes possibles pour cartes légères. |
| **`md` (Tablette portrait)** | `768px` | Tablette | Barre de navigation horizontale ou latérale, grilles 2 à 3 colonnes. |
| **`lg` (Bureau / Laptop)** | `1024px` | Écran d'ordinateur | Disposition multi-colonnes, panneaux latéraux permanents. |
| **`xl` (Grand écran)** | `1280px+` | Écran large | Conteneurs centrés avec largeur maximale (`max-w-7xl`), marges généreuses. |

---

## 3. Adaptation des Composants Complexes

### 3.1 Formulaires sur Mobile
- Les champs empilés en colonne unique (`flex-col`) sont obligatoires sur mobile : ne pas aligner label à gauche et champ à droite sur petit écran.
- Les types d'inputs HTML5 doivent invoquer le bon clavier virtuel :
  - `type="email"` pour les adresses courriel.
  - `type="tel"` pour les numéros de téléphone.
  - `type="text" inputmode="numeric" pattern="[0-9]*"` pour les codes SMS / OTP / codes postaux.

### 3.2 Tableaux de Données
- Sur petit écran, un tableau dense ne doit pas casser la largeur de l'écran :
  - Soit encapsuler dans `<div class="overflow-x-auto">` avec une ombre ou un indicateur signifiant qu'un défilement latéral du tableau est possible.
  - Soit transformer dynamiquement chaque ligne du tableau en carte individuelle (`card layout`).

---

## 4. Checklist de Validation du Développeur / Agent

- [ ] L'interface a été inspectée en simulation responsive à 320px, 375px, 768px et 1280px.
- [ ] Aucun débordement horizontal n'apparaît sur l'ensemble de la page à 320px de large.
- [ ] Tous les boutons et éléments cliquables sur mobile font au moins 44x44px.
- [ ] La balise `<meta name="viewport" content="width=device-width, initial-scale=1.0">` est présente et n'interdit pas le zoom utilisateur.
