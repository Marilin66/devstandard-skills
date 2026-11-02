---
name: backend-server-validation
description: "Règles strictes de validation côté serveur : non-confiance systématique envers le client, schémas typés stricts, rejet immédiat (fail-closed) et assainissement des entrées."
---

# Backend Server-Side Validation Standard

Ce skill formalise les exigences impératives pour la réception, la validation, la normalisation et le rejet sécurisé de toute donnée entrante sur une API ou un service backend.

---

## 1. Principes Absolus de Validation Backend

1. **Règle de non-confiance systématique (Zero Trust Client) :**
   Toute donnée provenant de l'extérieur (corps de requête JSON, paramètres d'URL, headers, cookies, fichiers téléversés) est considérée comme **potentiellement malveillante ou corrompue**. Une validation frontend n'est qu'une commodité pour l'utilisateur, **jamais une garantie de sécurité**.
2. **Politique de rejet strict (Fail-Closed & Whitelisting) :**
   - N'autoriser que les champs explicitement attendus. Tout champ superflu ou inattendu doit être soit rejeté (`422 Unprocessable Entity`), soit éliminé avant traitement.
   - Les formats numériques, chaînes, booléens, dates et emails doivent être typés et bornés (longueur min/max, valeurs autorisées).
3. **Format des erreurs normalisé (sans fuite d'informations) :**
   - Répondre avec un code HTTP adapté (`400 Bad Request` ou `422 Unprocessable Entity`).
   - Renvoyer un objet structuré identifiant le champ en faute et la contrainte non respectée.
   - **Interdiction formelle de renvoyer une stack trace, un nom de table interne ou une erreur brute de base de données.**

---

## 2. Spécification du Format de Réponse d'Erreur

Toute validation serveur échouée doit retourner un corps de réponse respectant le format standardisé suivant :

```json
{
  "status": "error",
  "code": "VALIDATION_FAILED",
  "message": "Les données fournies sont invalides ou incomplètes.",
  "errors": [
    {
      "field": "email",
      "rule": "format",
      "message": "Le champ email doit être une adresse électronique valide."
    },
    {
      "field": "age",
      "rule": "range",
      "message": "L'âge doit être un entier supérieur ou égal à 18."
    }
  ]
}
```

---

## 3. Règles par Type de Données

### 3.1 Chaînes de caractères (`Strings`)
- **Bornes obligatoires :** Toujours spécifier une taille minimale et une taille maximale (`minLength`, `maxLength`).
- **Normalisation :** Nettoyer les espaces inutiles (`trim()`) et vérifier l'encodage (UTF-8).
- **Protection contre les injections :** Ne jamais insérer une chaîne directement dans du code exécutable ou une requête SQL brute ; toujours utiliser des requêtes préparées/paramétrées.

### 3.2 Nombres & Identifiants
- Vérifier le type exact (entier vs flottant).
- Borner les valeurs acceptables (ex: `min: 1`, `max: 1000` pour une pagination).
- Interdire les entiers négatifs sur les identifiants et quantités.

### 3.3 Téléversement de Fichiers (`File Uploads`)
- **Vérification du type MIME réel (Magic Bytes) :** Ne jamais se fier à l'extension du nom de fichier ou au header `Content-Type` envoyé par le client.
- **Limite stricte de taille :** Rejeter immédiatement les fichiers dépassant le quota alloué.
- **Renommage aléatoire :** Ne jamais stocker le fichier sous le nom fourni par le client. Générer un identifiant UUID ou un hash pour le stockage.

---

## 4. Exemples d'Implémentation

### Exemple TypeScript / Zod (Node.js / Hono / Express)
```typescript
import { z } from "zod";

export const CreateUserSchema = z.object({
  fullName: z.string().trim().min(2, "Le nom doit comporter au moins 2 caractères").max(100),
  email: z.string().trim().email("Adresse email non conforme").toLowerCase(),
  password: z.string().min(12, "Le mot de passe doit comporter au moins 12 caractères"),
  role: z.enum(["member", "editor"]).default("member")
}).strict(); // .strict() rejette tout champ non documenté
```

### Exemple Python / Pydantic (FastAPI)
```python
from pydantic import BaseModel, EmailStr, Field

class CreateUserPayload(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=12)
    role: str = Field(default="member", pattern="^(member|editor)$")

    class Config:
        extra = "forbid"  # Rejette toute propriété superflue
```

---

## 5. Checklist de Validation du Développeur / Agent

- [ ] Tout point d'entrée API valide son payload avec un schéma strict avant toute logique métier.
- [ ] Les champs inattendus sont rejetés ou ignorés (whitelisting strict).
- [ ] Toutes les requêtes en base utilisent des requêtes préparées ou l'ORM de manière sécurisée.
- [ ] Les réponses d'erreur de validation ne révèlent aucune information interne sur le serveur ou la base de données.
- [ ] Les téléversements de fichiers contrôlent la taille maximale et le contenu réel avant stockage.
