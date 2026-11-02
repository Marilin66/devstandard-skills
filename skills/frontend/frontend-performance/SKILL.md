---
name: frontend-performance
description: "Règles strictes de performance web et Core Web Vitals : optimisation LCP/CLS/INP, chargement différé (lazy-loading), compression d'images (WebP/AVIF), et élimination des saccades de rendu."
---

# Frontend Performance & Web Vitals Standard

Ce skill formalise les exigences impératives pour garantir des temps de chargement ultra-rapides, une réactivité immédiate aux interactions utilisateur et une stabilité visuelle irréprochable.

---

## 1. Objectifs Core Web Vitals (Google Web Vitals)

Toute page web doit respecter les seuils recommandés de l'industrie :

| Métrique | Seuil "Bon" | Ce que cela mesure |
| :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | **≤ 2.5 secondes** | Vitesse de chargement perçue de l'élément de contenu principal de la page. |
| **INP (Interaction to Next Paint)** | **≤ 200 millisecondes** | Réactivité de la page lors d'un clic, d'une frappe ou d'une interaction. |
| **CLS (Cumulative Layout Shift)** | **≤ 0.1** | Stabilité visuelle (absence de sauts intempestifs de mise en page pendant le chargement). |

---

## 2. Règles d'Optimisation des Images & Médias

1. **Dimensions explicites obligatoires (Prévention du CLS) :**
   - Toujours déclarer `width` et `height` sur chaque balise `<img>` ou composant d'image, ou utiliser une classe de ratio fixe (`aspect-video`, `aspect-square`).
   - Ne jamais laisser le navigateur calculer les dimensions après le téléchargement de l'image, sous peine de provoquer un saut brutal de page (CLS élevé).
2. **Formats d'image modernes :**
   - Privilégier les formats compressés modernes **AVIF** ou **WebP** plutôt que PNG ou JPEG non optimisés.
   - Les icônes et logos doivent impérativement être en **SVG vectoriel**, allégé de métadonnées inutiles.
3. **Chargement différé (`Lazy loading`) intelligent :**
   - Toutes les images situées sous la ligne de flottaison doivent comporter `loading="lazy"`.
   - **Exception critique :** L'image principale du héros (hero banner ou premier visuel au-dessus de la ligne de flottaison) ne doit **JAMAIS** être en lazy loading ; elle doit comporter `loading="eager"` ou `priority` pour maximiser le LCP.

---

## 3. Optimisation du JavaScript & Rendu

1. **Découpage de code (Code Splitting) :**
   - Ne pas charger dans le bundle initial les composants lourds rarement utilisés (modales complexes, éditeurs WYSIWYG, graphiques de reporting).
   - Utiliser des imports dynamiques (`React.lazy()`, `next/dynamic`, ou `import()`).
2. **Optimisation des Polices de Caractères (Web Fonts) :**
   - Précharger les polices critiques (`rel="preload"` avec `crossorigin`).
   - Utiliser `font-display: swap` pour que le texte apparaisse immédiatement avec une police de secours en attendant le chargement de la police customisée.
3. **Débouncing / Throttling sur les Événements Fréquents :**
   - Les champs de recherche en temps réel (auto-complete) doivent temporiser les appels avec un debounce de **300ms** minimum pour ne pas saturer le thread principal ni le serveur.

---

## 4. Checklist de Validation du Développeur / Agent

- [ ] Toutes les images possèdent des attributs `width` et `height` ou un ratio CSS explicite.
- [ ] Le score CLS mesuré est inférieur à 0.1.
- [ ] Les images au-dessus de la ligne de flottaison ne sont pas en `loading="lazy"`.
- [ ] Aucun bundle JavaScript monolithique n'excède 200 Ko gzippé sur la page initiale.
- [ ] Les polices web utilisent `font-display: swap`.
