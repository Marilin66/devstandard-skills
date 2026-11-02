# Matrice des plateformes cibles

Source de vérité : [`packages/schemas/platforms.json`](../../packages/schemas/platforms.json), validé par
`platforms.schema.json` et vérifié par les tests (`npm run test:schemas`).

## Pourquoi un registre plutôt qu'une liste dans le code

Une promesse de compatibilité est une affirmation produit : elle doit être datée, testée et révisable.
Le registre est donc une donnée versionnée, contrôlée par schéma, et non une constante dispersée entre
le web, l'API et le moteur. Les énumérations `target_assistant` (brief projet) et `target` (manifeste
de pack) sont testées pour rester strictement égales aux identifiants du registre.

## Statuts

| Statut | Sens | Prérequis |
| --- | --- | --- |
| `native` | La plateforme prend en charge le format sans adaptation | Documentation officielle + test sur une version identifiée |
| `compatible_via_common_format` | Consomme directement le format commun (Agent Skills) | Test d'installation documenté |
| `adapter_required` | Un adaptateur dédié est indispensable | Adaptateur testé dans `packages/export-adapters` |
| `manual_install` | Copie ou collage manuel uniquement | Mode opératoire vérifié par une personne |
| `not_verified` | Rien n'est affirmé | Statut par défaut |

ADR-0007 : tout statut autre que `not_verified` exige une date de vérification (`verified_at`) ;
le schéma et les tests refusent un statut « vérifié » sans date.

## Trois familles de cibles

1. **Agents de code** (`ide-agent`, `open-standard`) : reçoivent des fichiers dans le dépôt —
   `SKILL.md`, règles de projet, `AGENTS.md`. C'est là que l'installation est réellement automatisable.
2. **Assistants de conversation** (`chat-assistant`) : ChatGPT, Claude (surfaces web), Gemini, Copilot,
   Meta AI. Aucun accès au dépôt du projet ; seule une consigne copiable ou un téléversement manuel
   a un sens. Un « pack » y est un document, pas une installation.
3. **Surfaces de messagerie** (`messaging-surface`) : WhatsApp Web, Facebook Lite. Le code source et les
   fichiers de référence ne sont pas accessibles. Ces cibles ne peuvent recevoir qu'un rappel de règles
   court et copiable ; annoncer autre chose serait mensonger.

## Conséquence sur les adaptateurs (Phase 5)

- Les adaptateurs de la famille 1 produisent des fichiers et sont testés automatiquement
  (structure, métadonnées, chemins, liens internes, absence de secrets).
- Les adaptateurs des familles 2 et 3 produisent un texte borné (résumé de règles + références) et sont
  marqués `manual_install` ou `not_verified` : aucun test ne peut prouver qu'un assistant de messagerie
  a lu ou appliqué une instruction.
- Un adaptateur qui échoue à ses tests de conformité reste `not_verified` et n'est jamais présenté comme
  compatible.

## État au 2026-11-02

Seul le format Agent Skills est décrit comme `native` en tant que **format** ; toutes les plateformes
concrètes sont `not_verified`. Aucune compatibilité n'est revendiquée tant que les tests d'adaptateur
de la Phase 5 n'existent pas.
