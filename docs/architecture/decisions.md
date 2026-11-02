# Décisions d'architecture

Chaque décision est datée, motivée et révisable. Les écarts constatés en cours de route sont
consignés ici plutôt que corrigés silencieusement.

## ADR-0001 — Monorepo à applications séparées

- **Date** : 2026-11-02
- **Contexte** : le dossier de référence impose Next.js, Laravel et FastAPI ; trois écosystèmes,
  trois gestionnaires de dépendances.
- **Décision** : un seul dépôt, trois applications (`apps/web`, `apps/api`, `apps/ai-engine`) et des
  packages partagés. npm workspaces couvre uniquement le monde JS (`apps/web`, `packages/*`) ;
  PHP et Python conservent Composer et pip.
- **Conséquence** : la CI est découpée par écosystème ; aucun outil de build unifié n'est imposé.
- **Révision** : si le couplage JS ↔ PHP devient pénible, un `docker/` dev-first suffira avant
  d'envisager un outil de monorepo supplémentaire.

## ADR-0002 — `packages/schemas` comme source de vérité

- **Date** : 2026-11-02
- **Contexte** : le même document doit être validé par l'API, le moteur et le futur export.
- **Décision** : les JSON Schemas (draft 2020-12) vivent dans `packages/schemas` et sont consommés
  tels quels par Node et Python (montage `/schemas` dans Docker Compose).
- **Conséquence** : un changement de contrat casse les tests des trois applications — c'est voulu.
- **Révision** : génération de types TypeScript depuis les schémas si les écarts manuels se
  multiplient.

## ADR-0003 — Laravel porte le métier, pas la composition des packs

- **Date** : 2026-11-02
- **Décision** : Laravel gère identité, rôles, projets, catalogue, quotas et exports ; la sélection,
  la résolution de conflits et la composition appartiennent au moteur.
- **Conséquence** : l'API ne contient pas de logique de génération ; elle déclenche et journalise.
- **Révision** : aucune prévue avant la Phase 6.

## ADR-0004 — Génération déterministe avant assistance LLM

- **Date** : 2026-11-02
- **Contexte** : un pack doit être reproductible à partir des versions de standards, du moteur et
  des paramètres (§7 du dossier).
- **Décision** : Phase 3 produit les packs sans LLM ; la Phase 4 ajoute l'analyse sémantique sous
  contraintes (sélection candidate, jamais publication automatique).
- **Conséquence** : les tests de reproductibilité restent possibles sans clé d'API ni coût.

## ADR-0005 — PostgreSQL + pgvector et Redis dès la Phase 1

- **Date** : 2026-11-02
- **Décision** : l'environnement de développement fournit PostgreSQL 16 + pgvector et Redis dès le
  départ, même si la Phase 1 ne les exploite qu'en partie.
- **Conséquence** : pas de migration d'infrastructure au moment de la recherche sémantique ; les
  tests unitaires Laravel restent sur SQLite en mémoire pour la vitesse.

## ADR-0006 — Isolation par utilisateur, testée négativement

- **Date** : 2026-11-02
- **Décision** : chaque ressource métier porte `user_id` ; les contrôleurs filtrent explicitement,
  les policies couvrent les actions éditoriales. Les tests d'accès négatifs sont obligatoires.
- **Conséquence** : un `findOrFail` non scopé est un défaut de revue, pas un détail.

## ADR-0007 — Compatibilité d'agent déclarée, jamais supposée

- **Date** : 2026-11-02
- **Décision** : chaque adaptateur porte un statut (`native`, `compatible_via_common_format`,
  `adapter_required`, `manual_install`, `not_verified`) avec une date de vérification. Le statut par
  défaut est `not_verified`.
- **Conséquence** : le site ne peut pas afficher « compatible » sans test documenté (addendum §4).
