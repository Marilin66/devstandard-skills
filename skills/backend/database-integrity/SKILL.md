---
name: backend-database-integrity
description: "Standards de conception de bases de données et intégrité : transactions ACID, contraintes relationnelles strictes, indexation stratégique, prévention des requêtes N+1 et migrations reproductibles."
---

# Backend Database & Data Integrity Standard

Ce skill formalise les exigences fondamentales pour la modélisation des données, la fiabilité transactionnelle et la prévention des corruptions de données ou effondrements de performance.

---

## 1. Principes Absolus d'Intégrité des Données

1. **Intégrité au niveau du moteur de base de données :**
   Ne jamais déléguer uniquement à l'application le soin de garantir l'intégrité relationnelle. La base de données doit faire respecter ses contraintes avec :
   - Des clés étrangères obligatoires (`FOREIGN KEY`) avec comportement explicite à la suppression (`ON DELETE RESTRICT` ou `ON DELETE CASCADE` intentionnel).
   - Des contraintes d'unicité (`UNIQUE`) pour éviter les doublons accidentels (ex: emails, slugs).
   - Des contraintes de vérification (`CHECK`) ou types stricts (ex: montant positif, statuts énumérés).
2. **Transactions ACID pour toute opération multi-tables :**
   Toute action métier modifiant plusieurs tables ou plusieurs lignes interdépendantes (ex: créer une facture + lignes de facture + déduire du solde) doit être encapsulée dans une **transaction atomique**. Si une étape échoue, la totalité de l'opération doit être annulée (`ROLLBACK`).
3. **Gestion explicite de la concurrence :**
   Pour les données sujettes aux accès concurrents (stocks, soldes de compte, réservation de créneaux), utiliser soit un verrouillage optimiste (colonne `version`), soit un verrouillage pessimiste (`SELECT ... FOR UPDATE`).

---

## 2. Règles de Performance & Indexation

### 2.1 Indexation Stratégique
- **Index sur clés étrangères :** Créer systématiquement un index sur chaque colonne de clé étrangère (`user_id`, `organization_id`, etc.) pour éviter des scans complets de table lors des jointures.
- **Index sur filtres et tris fréquents :** Indexer les colonnes régulièrement interrogées dans les clauses `WHERE` et `ORDER BY`.
- **Index composites :** Si les requêtes filtrent couramment sur plusieurs critères (ex: `WHERE tenant_id = ? AND status = ?`), créer un index composite dans l'ordre de sélectivité.

### 2.2 Prévention des Requêtes N+1
- Ne jamais exécuter de requêtes dans une boucle applicative (`for (const item of items) { await db.findDetails(item.id) }`).
- Toujours charger les relations nécessaires via une jointure (`JOIN`), une clause `IN (...)` ou un mécanisme de pré-chargement (`eager loading` dans les ORMs : `include`, `with`, `preload`).

---

## 3. Gestion des Migrations de Schéma

- **Migrations versionnées et immuables :** Les modifications de schéma sont enregistrées sous forme de fichiers de migration horodatés et commités dans Git.
- **Principe de compatibilité ascendante (Expand & Contract) :**
  Pour modifier ou supprimer une colonne en production sans indisponibilité :
  1. Ajouter la nouvelle colonne (étape 1).
  2. Écrire dans les deux colonnes et migrer les données en tâche de fond (étape 2).
  3. Basculer la lecture sur la nouvelle colonne (étape 3).
  4. Supprimer l'ancienne colonne dans une migration ultérieure (étape 4).

---

## 4. Checklist de Validation du Développeur / Agent

- [ ] Toutes les relations inter-tables sont protégées par des contraintes `FOREIGN KEY`.
- [ ] Les opérations modifiant plusieurs ressources liées sont enveloppées dans une transaction (`BEGIN ... COMMIT`).
- [ ] Les colonnes utilisées pour les jointures et les filtres récurrents sont indexées.
- [ ] Le code applicatif a été inspecté pour vérifier l'absence totale de requêtes N+1.
- [ ] Les migrations sont déterministes et peuvent être rejouées à blanc sur une base vierge sans erreur.
