---
name: backend-observability-logging
description: "Standards de journalisation structurée et observabilité : logs JSON, corrélation de requêtes (Trace ID / Request ID), masquage automatique des données personnelles (PII) et sondes de santé."
---

# Backend Observability & Logging Standard

Ce skill formalise les exigences pour produire des logs exploitables, indexables par des outils d'agrégation (Datadog, Grafana Loki, CloudWatch, Sentry) sans jamais compromettre la vie privée ni divulguer de secrets.

---

## 1. Principes Absolus de Journalisation

1. **Format JSON Structuré Obligatoire :**
   En environnement serveur, les logs ne doivent **jamais** être écrits sous forme de texte brut informel (`console.log("user logged in: " + user)`). Chaque ligne de log doit être un objet JSON valide sur une seule ligne (NDJSON), facilitant le filtrage et l'indexation.
2. **Identifiant de Corrélation Universel (`request_id` / `trace_id`) :**
   Toute requête entrante doit se voir attribuer (ou propager depuis l'en-tête `X-Request-ID`) un identifiant UUID unique. Cet identifiant doit accompagner **toutes les lignes de log** générées lors du traitement de cette requête, permettant de reconstituer tout le parcours d'une transaction.
3. **Masquage Impératif des Données Sensibles (PII Redaction) :**
   - **Interdiction formelle** d'écrire en clair dans les logs : mots de passe, numéros de cartes bancaires, tokens de session/JWT, secrets d'API, adresses postales, ou données médicales/sensibles.
   - Le système de log doit appliquer un filtre de masquage automatique (remplacement par `[REDACTED]`).

---

## 2. Format Canonique d'une Ligne de Log

Chaque événement doit inclure les champs minimaux suivants :

```json
{
  "timestamp": "2026-11-02T12:00:00.123Z",
  "level": "info",
  "service": "api-service",
  "environment": "production",
  "request_id": "a9b1c2d3-e4f5-4a6b-8c7d-9e0f1a2b3c4d",
  "user_id": "usr_987654",
  "method": "POST",
  "path": "/api/v1/demarches",
  "status_code": 201,
  "duration_ms": 42.5,
  "message": "Demande créée avec succès",
  "context": {
    "demarche_type": "certificat_nationalite",
    "payment_status": "confirmed"
  }
}
```

---

## 3. Niveaux de Gravité des Logs (Log Levels)

- **`debug`** : Détails techniques verbeux utiles au développement local (désactivés en production).
- **`info`** : Événements métier significatifs du cycle de vie normal (création de ressource, paiement réussi, démarrage du service).
- **`warn`** : Situation anormale mais traitée sans interruption du service (ex: retry réseau déclenché, rate limit approché, dépréciation d'API appelée).
- **`error`** : Échec d'une opération nécessitant une intervention ou investigation (ex: base de données inaccessible, exception non interceptée).
- **`fatal`** : Défaillance critique entraînant l'arrêt complet de l'application.

---

## 4. Points de Terminaison de Santé (`Healthchecks`)

Tout service backend doit exposer au moins un point d'entrée dédié au monitoring :
- `/health` ou `/up` : Retourne un statut `200 OK` avec un corps JSON léger :
  ```json
  {
    "status": "healthy",
    "version": "1.0.0",
    "timestamp": "2026-11-02T12:00:00.000Z",
    "checks": {
      "database": "up",
      "redis": "up"
    }
  }
  ```
- Si une dépendance critique est tombée, retourner un statut `503 Service Unavailable`.

---

## 5. Checklist de Validation du Développeur / Agent

- [ ] Les logs sont émis au format JSON structuré avec timestamp UTC au format ISO 8601.
- [ ] Chaque requête possède un `request_id` tracé à travers toutes les étapes du traitement.
- [ ] Les champs contenant des mots de passe, clés d'API ou données bancaires sont automatiquement masqués (`[REDACTED]`).
- [ ] Une sonde `/health` est disponible et vérifie l'état de santé effectif des dépendances critiques.
