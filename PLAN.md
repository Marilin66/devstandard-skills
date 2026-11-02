# DevStandard AI — Plan de réalisation

Document de pilotage dérivé de `DevStandard_AI_Dossier_de_reference_et_prompt_agent_v1.1.pdf` (v1.0 + addendum v1.1).
Chaque exigence du PDF est rattachée à une phase et à un critère vérifiable. Aucune exigence n'est supprimée
silencieusement : les écarts et ambiguïtés sont listés en §7.

## 1. Audit du dépôt (Phase 0)

| Élément | État observé |
| --- | --- |
| Contenu du dépôt | Uniquement le PDF de référence. Aucun code, aucun dépôt Git initialisé. |
| Node / npm | Node 24.22.1, npm 11.19.1 |
| Python | 3.15.2, pip 26.2.2 |
| Docker | Engine 29.9.2, Compose v5.6.1 |
| PHP / Composer | **Absents de la machine hôte** → l'API Laravel s'exécute et se teste en conteneur (`apps/api/docker`). |
| Base de données | Non installée localement → PostgreSQL fourni par Docker Compose. |

Conclusion : démarrage à zéro. La Phase 1 crée le socle exécutable ; aucune reprise de code existant n'est nécessaire.

## 2. Exigences extraites (traçabilité)

| Réf. PDF | Exigence | Phase |
| --- | --- | --- |
| §1, §7 | Produit « generator » : packs exportables, pas de pilotage d'agent | 3–5 |
| §3, §4 | Référentiel Frontend : tokens, typographie, formulaires, composants, responsive, a11y, motion, perf, architecture | 2 |
| §5 | Référentiel Backend : architecture, API, IAM, input/data, sécurité, DB, fiabilité, tests, observabilité, ops | 2 |
| §6 | Modèle canonique d'un standard + métadonnées obligatoires | **1** (schéma) / 2 (CRUD) |
| §7 | Pipeline en 10 étapes, règles de sélection strictes, exceptions tracées, provenance | 3–4 |
| §7 | Adaptateurs d'export (Agent Skills, Claude Code, Cursor, OpenCode, Codex, universel) | 5 |
| §8 | Stack : Next.js/TS, Tailwind, Laravel, FastAPI, PostgreSQL+pgvector, Redis, S3, Sentry | **1** (squelette) |
| §8 | API initiale (`/api/standards`, `/api/projects`, `/api/generations`, `/api/packs`, `/api/exports`) | **1** (standards, projects) / 3–5 |
| §9 | Sécurité plateforme, isolation, validation serveur, secrets, imports non fiables | **1** (auth, policies) puis 6 |
| §9 | Validation des packs avec statuts `pass`/`fail`/`skipped`/`not_applicable` | 6 |
| §9 | WCAG 2.2 AA, tests a11y et responsive | 7 |
| §10 | Routes produit : landing, catalogue, fiche, générateur, dashboard, admin | **1** (squelette) / 2–7 |
| §10 | Identité visuelle originale, tokens sémantiques, états complets | 2 + 7 |
| §11 | MVP-A → MVP-F et checklist d'acceptation (12 points) | 1–7 |
| §12 | Prompt maître : plan → tranches verticales, pas de maquettes | continu |
| Addendum §4 | Matrice multi-plateformes (agents, chat, messagerie) — registre `platforms.json` | **1** (registre) / 5 (adaptateurs) |
| Addendum §1 | Publication GitHub (OAuth/GitHub App, jamais de PAT en clair) | 8 (post-MVP v1.1) |
| Addendum §2–3 | Structure `SKILL.md`, `.agents/skills/`, README/manifest/changelog, installation projet | 5 |
| Addendum §4 | Compatibilité multi-agents (agents de code, assistants de chat, messageries) : registre versionné, statut `not_verified` par défaut | 5 (adaptateurs) |
| Addendum §7 | Critères d'acceptation packs/GitHub | 5 + 8 |

## 3. Architecture retenue

```
devstandard-ai/
├─ apps/
│  ├─ web/            # Next.js 15 + TypeScript + Tailwind (interface produit)
│  ├─ api/            # Laravel 12 (métier, auth, catalogues, quotas, exports)
│  └─ ai-engine/      # FastAPI (retrieval, composition, validation IA)
├─ packages/
│  ├─ schemas/        # JSON Schemas canoniques + exemples + CLI de validation
│  └─ export-adapters/# adaptateurs par agent (Phase 5)
├─ standards/         # corpus éditorial (frontend/, backend/)
├─ docs/              # produit, architecture (ADR), sécurité, infra
├─ docker/            # ressources d'infra partagées
└─ .github/workflows/ # CI
```

Décisions (détail dans `docs/architecture/decisions.md`) :

- **ADR-0001** Monorepo à applications séparées ; npm workspaces uniquement pour web + packages (PHP/Python gardent
  leurs gestionnaires natifs).
- **ADR-0002** `packages/schemas` est l'unique source de vérité du format canonique (JSON Schema 2020-12) ; web, API et
  moteur consomment le même contrat.
- **ADR-0003** Laravel porte l'identité, les droits, le catalogue, les quotas et les exports ; il ne compose pas les packs.
- **ADR-0004** Génération déterministe d'abord (Phase 3), LLM ensuite et sous contrôle (Phase 4) : un pack doit rester
  reproductible sans modèle génératif.
- **ADR-0005** PostgreSQL (+ pgvector) et Redis dès la Phase 1 pour éviter une migration d'infrastructure ultérieure.
- **ADR-0006** Isolation des données par `user_id` + policies Laravel, testée par des cas négatifs.
- **ADR-0007** Un adaptateur n'annonce une compatibilité qu'après test documenté ; statut par défaut `not_verified`.

## 4. Phases

| Phase | Contenu | Critère de sortie | Statut |
| --- | --- | --- | --- |
| 0 | Audit, décisions, plan | Ce document + ADR | **fait** |
| 1 | Monorepo, environnements Docker, schémas canoniques, base, auth, CI | `npm test`, `php artisan test` et tests moteur verts en CI | **en cours** |
| 2 | Standards Library + admin (CRUD, revue, publication, versionnement, 30–50 standards) | Catalogue filtrable, standards publiés et sourcés | à faire |
| 3 | Project intake + génération déterministe (intake → applicabilité → dépendances → conflits → manifeste) | Pack généré avec provenance, conflits bloquants | à faire |
| 4 | AI Engine (retrieval pgvector, composition contrôlée, garde-fous) | Sélection assistée mais contrainte par le déterminisme | à faire |
| 5 | Pack builder, adaptateurs, ZIP, publication GitHub | ZIP valide, arborescence `SKILL.md`, matrice d'agents | à faire |
| 6 | Validation engine, sécurité, observabilité | Rapport `pass/fail/skipped/not_applicable`, SAST, logs | à faire |
| 7 | Finition UX, documentation, déploiement, recette | Checklist §11 du PDF passée, CI verte | à faire |

## 5. Phase 1 — périmètre livré

1. **Monorepo** `apps/*`, `packages/*`, `docs/`, `standards/`, workspaces npm, `.env.example`, README.
2. **Schémas canoniques** (`packages/schemas`) : `standard`, `project-brief`, `pack-manifest`, registre
   `platforms` (agents de code, assistants de chat, surfaces de messagerie), exemples éditoriaux, CLI
   `validate` et tests (cas valides + cas rejetés + cohérence des énumérations de cibles).
3. **API Laravel** : migrations `users` / `projects` / `standards`, rôles `member|editor|admin`, auth par jetons
   Sanctum (register/login/logout/me, throttling), catalogue de standards en lecture, projets isolés par utilisateur,
   policies, form requests, seeders explicitement marqués « exemples éditoriaux », tests de feature.
4. **Moteur FastAPI** : `/health`, lecture des schémas partagés, validation d'un standard reçu, tests pytest.
5. **Web Next.js** : shell typé (Tailwind), page d'accueil listant les domaines du référentiel, client API typé,
   aucune maquette statique présentée comme fonctionnelle.
6. **Environnements** : Docker Compose (Postgres+pgvector, Redis, api, web, ai-engine), Dockerfiles, healthchecks.
7. **CI** GitHub Actions : jobs `schemas`, `web`, `api` (tests SQLite), `api-postgres` (migrations sur
   PostgreSQL 16 + pgvector), `ai-engine`.

### Statut de vérification (2026-11-02, poste Windows)

| Vérification | Résultat |
| --- | --- |
| `npm run test:schemas` | 11 tests, 11 réussis |
| `npm run typecheck --workspace @devstandard/web` | réussi |
| `npm run build --workspace @devstandard/web` | réussi |
| `php artisan test` (WAMP PHP 8.3.28, SQLite mémoire) | 26 tests, 26 réussis (88 assertions) |
| Migrations + seed sur **MySQL 8.4 de WAMP** (base `devstandard`) | 4 migrations exécutées, 2 standards seedés |
| API locale `artisan serve` :8000 sur MySQL | catalogue 200 (2 standards), fiche 200, filtre 200, inscription 201, `/auth/me` 200, projet 201, sans jeton 401, `/up` 200 |
| `pytest` (conteneur `python:3.13-slim`, schémas montés) | 6 tests, 6 réussis |
| `docker compose config` | valide, 5 services |
| `migrate:fresh --seed` sur MySQL 8.4 de WAMP | 4 migrations + 2 standards seedés |
| Parcours HTTP sur l'API locale (WAMP, port 8000) | catalogue 200 (2 standards), fiche 200, filtre 200, inscription 201, `me` 200, projet 201, sans jeton 401, `/up` 200 |
| `php artisan test` sous PHP WAMP 8.3.28 (hors conteneur) | 26 tests, 26 réussis |
| `php artisan migrate:fresh --seed` (WAMP PHP 8.3.28 + MySQL 8.4) | 4 migrations exécutées, 2 standards seedés |
| Parcours HTTP local `artisan serve` sur MySQL | catalogue 200 (2 standards), fiche 200, filtre 200, inscription 201, `/auth/me` 200, création projet 201, sans jeton 401 |
| `docker compose up --build` (db, redis, api, web, ai-engine) | 5 services démarrés ; `db`, `redis`, `web`, `ai-engine` restent actifs — le conteneur `api` a été arrêté pour libérer le port 8000 au profit de `artisan serve` local |
| Migrations + seed sur PostgreSQL 16 + pgvector | 4 migrations et 2 standards seedés, exécutés dans le conteneur |
| Parcours HTTP réels (catalogue, fiche, filtre, inscription, me, projet, 401, web, moteur) | tous conformes |

Correctifs issus des démarrages réels : verrouillage de la résolution Composer sur PHP 8.3 (`platform`),
suppression de la dépendance à un `apps/api/.env` local sous Docker, **bornage des colonnes indexées
à 191 caractères** (`users.email`, `password_reset_tokens.email`, colonnes polymorphes) — ce serveur
refuse une clé utf8mb4 de plus de 1000 octets, erreur qui bloquait la migration `users`.

**Environnement local de référence : WAMP** (C:\wamp64, MySQL 8.4 :3306, PHP 8.3.28, Composer en
`.tools/composer.phar`). Docker Compose reste disponible pour la parité Postgres/pgvector et la CI.

## 6. Risques et inconnues

| Risque | Impact | Parade |
| --- | --- | --- |
| PHP absent de l'hôte | Tests API non exécutables hors conteneur | Docker Compose + image de test dédiée, CI sur `ubuntu-latest` |
| Versions de formats d'agents mouvantes (addendum §4) | Packs annoncés compatibles à tort | Statut `not_verified` par défaut, tests par adaptateur, doc datée |
| Corpus initial sans validation juridique | Publication de contenu douteux | `sources` + `license` obligatoires dans le schéma, revue éditoriale en Phase 2 |
| pgvector non disponible en CI | Perte de temps sur Phase 4 | Service `pgvector/pgvector:pg16` dans la CI dès la Phase 1 |
| Périmètre MVP large (6 lots) | MVP inachevé | Tranches verticales, phase 3 livrable sans LLM |

## 7. Décisions non résolues / écarts assumés

- **Laravel testé en SQLite en mémoire** (rapide, portable) ; PostgreSQL reste la cible d'exécution. Les migrations
  évitent tout type spécifique à un SGBD ; les tests Postgres seront ajoutés avec pgvector (Phase 4).
- **Pas de TS généré depuis les schémas** en Phase 1 : les types web sont écrits à la main et alignés sur le schéma ;
  la génération automatique sera évaluée si les écarts deviennent coûteux.
- **Sanctum en mode jetons d'API** (pas de cookies SPA) : le front consomme `Authorization: Bearer`. Le mode cookie
  stateful sera ajouté quand le dashboard authentifié arrive (Phase 2).
- **Pas de `git init`** : opération laissée à la main du propriétaire du dépôt.
- **Générations/packs** : tables créées en Phase 3/5 avec le pipeline, pas en Phase 1.
