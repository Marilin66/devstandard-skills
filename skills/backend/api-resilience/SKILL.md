---
name: backend-api-resilience
description: "Standards de conception d'API résilientes et fiables : statuts HTTP sémantiques, pagination bornée, limitation de débit (rate limiting), timeouts stricts, idempotence et gestion d'erreurs."
---

# Backend API Design & Resilience Standard

Ce skill formalise les exigences architecturales pour concevoir des APIs robustes, prévisibles et capables de résister aux pannes réseau, aux surcharges et aux attaques par déni de service.

---

## 1. Conventions Fondamentales des APIs RESTful

1. **Statuts HTTP sémantiques stricts :**
   - `200 OK` : Succès pour une lecture (`GET`) ou mise à jour idempotente (`PUT`).
   - `201 Created` : Création réussie d'une ressource (`POST`), avec idéalement le header `Location`.
   - `204 No Content` : Succès pour une action ne retournant aucun corps (ex: `DELETE`).
   - `400 Bad Request` : Requête syntaxiquement mal formée.
   - `401 Unauthorized` : Authentification absente, expirée ou invalide.
   - `403 Forbidden` : Utilisateur authentifié mais non autorisé à exécuter cette action.
   - `404 Not Found` : Ressource inexistante ou cachée pour des raisons d'autorisation.
   - `422 Unprocessable Entity` : Échec de validation sémantique métier des données.
   - `429 Too Many Requests` : Quota ou limitation de débit dépassé.
   - `500 Internal Server Error` : Erreur interne inattendue (sans divulgation de code ou trace).

2. **Pagination obligatoire et bornée :**
   - **Interdiction formelle** de renvoyer un tableau non paginé sur des listes de ressources.
   - La taille de page par défaut doit être raisonnable (ex: 20 éléments) et plafonnée à un maximum strict (ex: 100 éléments maximum) pour protéger la mémoire du serveur.
   - Fournir des métadonnées claires de pagination :
     ```json
     {
       "data": [...],
       "meta": {
         "page": 1,
         "per_page": 20,
         "total": 142,
         "total_pages": 8
       }
     }
     ```

---

## 2. Règles de Résilience & Protection

### 2.1 Limitation de Débit (Rate Limiting)
- Tout point d'entrée exposé doit être protégé par une limitation de débit appropriée.
- Les endpoints sensibles (connexion, réinitialisation de mot de passe, création de compte) doivent avoir des seuils stricts (ex: 5 tentatives par minute par IP/identifiant) avec blocage temporaire exponentiel.
- Inclure les headers standards dans la réponse :
  - `RateLimit-Limit`
  - `RateLimit-Remaining`
  - `RateLimit-Reset`

### 2.2 Timeouts et Retries Bornés
- Tout appel réseau vers un service tiers ou une base de données doit être encadré par un **timeout explicite et strict** (ex: 3 à 5 secondes).
- Ne jamais effectuer de retries infinis en cas d'échec :
  - Nombre maximal de retries : 3 tentatives.
  - Utiliser un délai avec backoff exponentiel et jitter aléatoire pour éviter l'effet "thundering herd" qui achèverait un service en difficulté.

### 2.3 Clés d'Idempotence pour les Opérations Critiques
- Pour les transactions financières ou les actions critiques à effet de bord (création de commande, paiement), exiger un header `Idempotency-Key: <UUID>`.
- Si une requête avec la même clé est reçue alors que la précédente a réussi, renvoyer la réponse originale mise en cache sans ré-exécuter l'action.

---

## 3. Checklist de Validation du Développeur / Agent

- [ ] Tous les points de terminaison renvoient des statuts HTTP précis et adaptés.
- [ ] Aucune liste d'entités n'est retournée sans limite ni pagination bornée.
- [ ] Les appels sortants vers les APIs externes possèdent un timeout défini.
- [ ] Les endpoints d'authentification et de paiement sont protégés par du rate-limiting.
- [ ] Les réponses d'erreur n'exposent jamais de détails d'infrastructure ou de variables d'environnement.
