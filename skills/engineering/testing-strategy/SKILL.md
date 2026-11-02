---
name: engineering-testing-strategy
description: "Stratégie rigoureuse de tests logiciels : pyramide des tests, tests de cas négatifs et de refus d'accès obligatoires, données de test isolées, et reproductibilité en intégration continue (CI)."
---

# Engineering Testing Strategy Standard

Ce skill formalise les exigences pour la mise en place d'une suite de tests automatisés fiable, rapide et réellement protectrice contre les régressions et les failles de sécurité.

---

## 1. Principes Absolus de Test

1. **Obligation de tester les cas négatifs (Negative Testing) :**
   Il est strictement interdit de ne tester que les scénarios nominaux (« happy paths »). La valeur d'une suite de tests réside principalement dans sa capacité à vérifier :
   - Le rejet des données invalides ou malicieuses (`422` ou `400`).
   - Le refus d'accès pour un utilisateur non connecté (`401`).
   - Le refus d'accès pour un utilisateur connecté tentant de toucher aux données d'un tiers (`403` ou `404`).
2. **Déterminisme et isolation totale des tests :**
   - Un test ne doit jamais dépendre de l'ordre d'exécution d'un autre test.
   - Chaque test doit nettoyer ses effets de bord (remise à zéro de la base de données, transactions annulées en fin de test).
   - Les appels vers les services tiers payants ou externes doivent être interceptés et simulés avec des mocks fiables (ex: pas d'appels réels à Stripe ou aux passerelles SMS pendant les tests).
3. **Pyramide des tests équilibrée :**
   - **Tests Unitaires (70%)** : Rapides, testent la logique métier pure et les fonctions isolées.
   - **Tests d'Intégration & API (20%)** : Testent les routes réelles, les contrôleurs, la base de données et les règles de validation.
   - **Tests de Bout en Bout / E2E (10%)** : Testent les parcours utilisateurs critiques complets (inscription, démarche, paiement).

---

## 2. Exemple de Test d'Intégration Conforme (Cas Positifs et Négatifs)

```typescript
describe("POST /api/v1/projects", () => {
  it("rejette la création si l'utilisateur n'est pas authentifié (401)", async () => {
    const res = await request(app)
      .post("/api/v1/projects")
      .send({ title: "Nouveau Projet" });

    expect(res.status).toBe(401);
  });

  it("rejette les données invalides ou incomplètes (422)", async () => {
    const token = await generateAuthToken(testUser);
    const res = await request(app)
      .post("/api/v1/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "" }); // Titre vide non autorisé

    expect(res.status).toBe(422);
    expect(res.body.errors).toContainEqual(
      expect.objectContaining({ field: "title" })
    );
  });

  it("crée avec succès un projet et l'isole à l'utilisateur authentifié (201)", async () => {
    const token = await generateAuthToken(testUser);
    const res = await request(app)
      .post("/api/v1/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Refonte Portail Usager" });

    expect(res.status).toBe(201);
    expect(res.body.data.userId).toBe(testUser.id);
  });

  it("interdit formellement à un autre utilisateur de modifier ce projet (403/404)", async () => {
    const otherUserToken = await generateAuthToken(otherUser);
    const res = await request(app)
      .put(`/api/v1/projects/${createdProjectId}`)
      .set("Authorization", `Bearer ${otherUserToken}`)
      .send({ title: "Tentative d'altération" });

    expect([403, 404]).toContain(res.status);
  });
});
```

---

## 3. Checklist de Validation du Développeur / Agent

- [ ] La suite de tests comprend des tests systématiques de permissions négatives (accès interdit).
- [ ] Les tests d'API vérifient les statuts HTTP et les formats des corps d'erreur.
- [ ] Les tests sont reproductibles localement et en CI sans nécessiter de configuration manuelle.
- [ ] Les données de test sont isolées et chaque scénario s'exécute de façon indépendante.
