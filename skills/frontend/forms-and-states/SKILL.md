---
name: frontend-forms-and-states
description: "Standards stricts pour formulaires, démarches usager et gestion systématique des états : loading, empty, error, disabled, success, labels persistants et messages d'aide."
---

# Frontend Forms & States Standard

Ce skill formalise les exigences pour la conception et l'implémentation de formulaires robustes, accessibles et résilients, inspirés des démarches administratives et des services publics (service-public.bj, demarchesmtfp.gouv.bj, GOV.UK Design System).

---

## 1. Règles Non Négociables des Formulaires

1. **Labels persistants et visibles :**
   - Un `placeholder` n'est **jamais** un label. Le label doit rester visible lorsque le champ est rempli ou en cours de saisie.
   - Tout `<input>`, `<select>` ou `<textarea>` doit posséder un identifiant `id` associé à un `<label for="...">`.
2. **Gestion complète des 5 états :**
   Aucun composant ou formulaire n'est considéré terminé sans l'implémentation de :
   - `Default` (repos)
   - `Loading / Submitting` (chargement / soumission avec bouton désactivé et spinner non bloquant)
   - `Error` (erreur champ par champ + résumé global en haut de page si multi-champs)
   - `Empty` (état vide pour listes ou données avec appel clair à l'action)
   - `Success` (confirmation explicite de réception ou d'enregistrement)
3. **Format des messages d'erreur :**
   - L'erreur doit expliquer **ce qui ne va pas** et **comment corriger** (ex: *"Saisissez une date au format JJ/MM/AAAA"* et non pas simplement *"Date invalide"*).
   - Lier l'erreur au champ via `aria-describedby` et marquer `aria-invalid="true"`.
4. **Bouton de soumission explicite :**
   - Le bouton doit indiquer l'action précise : *"Enregistrer la demande"*, *"Créer le compte"*, et jamais un verbe flou comme *"Valider"* ou *"OK"*.

---

## 2. Anatomie d'un Champ Conforme

```html
<div class="form-group flex flex-col gap-1.5 mb-4">
  <!-- 1. Label persistant avec indication obligatoire -->
  <label for="user-email" class="text-sm font-semibold text-[var(--text-primary)]">
    Adresse email <span class="text-[var(--feedback-danger-text)]" aria-hidden="true">*</span>
    <span class="sr-only">(champ obligatoire)</span>
  </label>

  <!-- 2. Texte d'aide contextuel (avant saisie) -->
  <p id="user-email-hint" class="text-xs text-[var(--text-secondary)]">
    Nous vous enverrons le récépissé de votre démarche à cette adresse.
  </p>

  <!-- 3. Champ interactif avec états d'accessibilité -->
  <input
    id="user-email"
    name="email"
    type="email"
    autocomplete="email"
    aria-required="true"
    aria-describedby="user-email-hint user-email-error"
    aria-invalid="true"
    class="w-full px-3 py-2 rounded-md border border-[var(--feedback-danger-border)] bg-[var(--surface-card)] text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[var(--action-primary-focus)] outline-none"
  />

  <!-- 4. Message d'erreur clair avec icône descriptive -->
  <p id="user-email-error" class="flex items-center gap-1.5 text-xs font-medium text-[var(--feedback-danger-text)]" role="alert">
    <svg class="w-4 h-4 text-[var(--feedback-danger-text)]" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
    </svg>
    Saisissez une adresse email valide comprenant un "@" et un nom de domaine (ex: contact@domaine.bj).
  </p>
</div>
```

---

## 3. Gestion des États Globaux

### 3.1 État de Chargement / Soumission (`isSubmitting`)
- Désactiver le bouton principal pour éviter le double-clic : `disabled aria-busy="true"`.
- Afficher un indicateur textuel clair : *"Enregistrement en cours..."*.
- Ne pas cacher le contenu de la page pendant le chargement ; préférer un indicateur de progression ou des squelettes de chargement (`skeletons`).

### 3.2 État Vide (`Empty State`)
Lorsqu'une liste ou un tableau ne contient aucune donnée :
- Ne jamais afficher un écran blanc ou un tableau vide sans message.
- Fournir :
  1. Une illustration ou icône claire.
  2. Un titre expliquant la situation (*"Aucune démarche en cours"*).
  3. Un texte d'explication court.
  4. Un bouton d'action principal évident (*"Initier une nouvelle démarche"*).

---

## 4. Checklist de Validation du Développeur / Agent

- [ ] Tous les champs possèdent un `<label>` associé par `id`.
- [ ] Les champs obligatoires sont explicitement balisés visuellement et pour les lecteurs d'écran.
- [ ] Les erreurs associent `aria-invalid="true"` et `aria-describedby` ciblant l'identifiant du message d'erreur.
- [ ] Les boutons de soumission sont protégés contre les soumissions multiples (double-clic).
- [ ] Les listes de données gèrent explicitement le chargement, l'absence de données (empty) et l'échec réseau.
