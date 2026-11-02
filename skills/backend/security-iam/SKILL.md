---
name: backend-security-iam
description: "Règles strictes de gestion des identités, authentification et contrôle d'accès : isolation stricte par tenant/utilisateur, politiques côté serveur, pas de fail-open et sécurisation des tokens."
---

# Backend Security & IAM Standard

Ce skill formalise les exigences impératives pour l'authentification (AuthN) et l'autorisation (AuthZ). Il vise à éliminer définitivement les vulnérabilités de type BOLA/IDOR (Broken Object Level Authorization) et les élévations de privilèges.

---

## 1. Principes Absolus d'Autorisation

1. **Vérification côté serveur obligatoire (Server-Side Enforcement) :**
   Masquer un élément dans l'interface (ex: cacher le bouton "Supprimer" ou le lien d'administration) ne constitue **aucune mesure de sécurité**. Chaque point d'accès d'API doit valider indépendamment l'identité et les permissions de l'utilisateur pour l'action ET la ressource demandée.
2. **Politique du rejet par défaut (Fail-Closed / Default Deny) :**
   Si une règle d'accès n'est pas explicitement satisfaite, ou en cas de doute/erreur de calcul de droits, l'accès doit être immédiatement refusé (`403 Forbidden` ou `401 Unauthorized`).
3. **Isolation stricte des données (Tenant / User Isolation) :**
   Dans toute requête accédant à une ressource (lecture, mise à jour, suppression), l'identifiant du propriétaire ou du tenant doit être injecté **depuis le contexte d'authentification vérifié**, et **jamais** depuis le corps de requête ou un paramètre modifiable par l'utilisateur.

---

## 2. Règles d'Implémentation

### 2.1 Prévention des vulnérabilités BOLA / IDOR
❌ **Anti-pattern dangereux :**
```javascript
// DANGEREUX : N'importe quel utilisateur connecté peut modifier le projet de quelqu'un d'autre
app.put("/api/projects/:id", async (req, res) => {
  const project = await db.findProject(req.params.id);
  await project.update(req.body);
  res.json(project);
});
```

✅ **Pattern Conforme (Contrôle d'accès au niveau de l'objet) :**
```javascript
// CONFORME : La requête filtre obligatoirement sur l'utilisateur authentifié
app.put("/api/projects/:id", requireAuth, async (req, res) => {
  const currentUserId = req.user.id;
  const project = await db.findProject({ id: req.params.id, userId: currentUserId });
  
  if (!project) {
    // Ne pas révéler si la ressource existe ou appartient à un tiers
    return res.status(404).json({ code: "NOT_FOUND", message: "Projet introuvable." });
  }

  await project.update(req.body);
  res.json(project);
});
```

### 2.2 Gestion Sécurisée des Jetons (Tokens) et Mots de Passe
- **Hachage des mots de passe :** Utiliser exclusivement des algorithmes lents et résistants (Argon2id ou bcrypt avec facteur de coût minimal de 12). Ne jamais utiliser MD5, SHA-1 ou SHA-256 pour les mots de passe.
- **Stockage des jetons côté client :** Pour les applications web, privilégier des cookies `HttpOnly`, `Secure` et `SameSite=Lax` ou `Strict` afin d'immuniser l'authentification contre le vol de jetons par attaques XSS.
- **Révocation et expiration :** Définir une durée de vie courte pour les jetons d'accès (`access token` ≤ 15 minutes) et gérer une rotation sécurisée des jetons de rafraîchissement (`refresh token`).

---

## 3. Matrice de Rôles & Permissions (RBAC)

Les rôles d'un système doivent être distincts et cumulatifs de manière contrôlée :

| Rôle | Périmètre d'action autorisé |
| :--- | :--- |
| **`member`** | Accès en lecture/écriture uniquement à ses propres ressources privées. |
| **`editor`** | Modification des contenus partagés d'un groupe ou d'une organisation, sans accès à la facturation ni aux membres. |
| **`admin`** | Gestion des membres, configuration d'organisation et audit. |

Toute tentative d'accès d'un rôle non autorisé doit générer un log de sécurité d'audit horodaté avec l'IP et l'identifiant de l'utilisateur.

---

## 4. Checklist de Validation du Développeur / Agent

- [ ] Aucune ressource n'est accessible par son identifiant numérique simple sans vérification de propriété.
- [ ] Les endpoints protégés rejettent immédiatement avec un statut HTTP 401 si le jeton est absent ou invalide.
- [ ] Les tentatives d'accès à des ressources appartenant à un tiers retournent un statut 404 (pour éviter la découverte d'identifiants) ou 403.
- [ ] Les mots de passe sont hachés avec Argon2id ou bcrypt.
- [ ] Les sessions et tokens sensibles sont invalidés lors de la déconnexion et lors d'un changement de mot de passe.
