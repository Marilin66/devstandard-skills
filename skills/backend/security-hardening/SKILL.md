---
name: backend-security-hardening
description: "Durcissement de la sécurité backend (OWASP Top 10) : protection contre les injections, CSRF, SSRF, en-têtes HTTP de sécurité stricts (HSTS, CSP) et gestion étanche des secrets."
---

# Backend Security Hardening Standard

Ce skill formalise les exigences impératives de durcissement défensif des applications backend afin de résister aux attaques documentées par l'OWASP (Open Web Application Security Project).

---

## 1. Protection contre les Injections (OWASP A03)

1. **Injections SQL :**
   - **Interdiction formelle** de concaténer des variables utilisateur dans des requêtes SQL (`"SELECT * FROM users WHERE email = '" + email + "'"`).
   - Utiliser obligatoirement des requêtes préparées avec paramètres typés (`$1`, `?`) ou les méthodes sûres de l'ORM.
2. **Injections de Commandes Système (Command Injection) :**
   - Ne jamais exécuter de commandes shell système (`exec`, `system`, `shell_exec`, `child_process.exec`) en y injectant une variable provenant d'un utilisateur.
   - Si une commande externe est indispensable, utiliser l'exécution avec tableau d'arguments (`spawn(['tar', '-czf', dest, file])`) sans interpréteur shell intermédiaire.

---

## 2. En-têtes HTTP de Sécurité Obligatoires

Tout service web ou API doit renvoyer dans ses réponses HTTP les headers de durcissement suivants :

| En-tête HTTP | Valeur recommandée | Rôle de sécurité |
| :--- | :--- | :--- |
| **`Strict-Transport-Security`** | `max-age=63072000; includeSubDomains; preload` | Force l'utilisation exclusive du protocole HTTPS (HSTS). |
| **`X-Content-Type-Options`** | `nosniff` | Interdit au navigateur de deviner le type MIME d'un fichier (MIME confusion attack). |
| **`X-Frame-Options`** | `DENY` ou `SAMEORIGIN` | Empêche l'affichage de l'application dans une `<iframe>` (protection Clickjacking). |
| **`Content-Security-Policy`** | `default-src 'self'; ...` | Restreint drastiquement les sources de scripts, styles et connexions externes. |
| **`Referrer-Policy`** | `strict-origin-when-cross-origin` | Empêche la fuite d'informations sensibles contenues dans l'URL vers des sites tiers. |

---

## 3. Prévention des Vulnérabilités Web Courantes

### 3.1 Protection contre les requêtes contrefaites (CSRF)
- Pour toute API utilisant des cookies d'authentification de session :
  - Configurer les cookies avec `SameSite=Lax` ou `Strict` et le flag `Secure`.
  - Implémenter un jeton anti-CSRF (Double Submit Cookie ou Token de synchronisation) sur toutes les routes `POST`, `PUT`, `DELETE`.

### 3.2 Prévention des requêtes falsifiées côté serveur (SSRF)
- Lorsqu'une application doit appeler une URL fournie par un utilisateur (ex: webhooks, téléchargement d'avatar distant) :
  - Valider l'URL contre une liste blanche de domaines autorisés ou restreindre aux protocoles `https://`.
  - **Bloquer impérativement les adresses IP privées et réservées** (`127.0.0.1`, `localhost`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `169.254.169.254` pour les métadonnées cloud AWS/GCP).

---

## 4. Gestion Étanche des Secrets et Clés d'API

- **Zéro secret dans le code :** Aucun mot de passe, clé d'API, certificat ou jeton d'accès ne doit figurer dans les fichiers source ou l'historique Git.
- **Variables d'environnement :** Injecter les secrets via des variables d'environnement fournies au démarrage du processus.
- **Filtres de commit :** Configurer un outil de détection de secrets (ex: `gitleaks`, `trufflehog`) dans la chaîne CI/CD pour bloquer tout commit accidentel.

---

## 5. Checklist de Validation du Développeur / Agent

- [ ] Aucune requête SQL brute n'utilise la concaténation de chaînes.
- [ ] Les en-têtes de sécurité (HSTS, nosniff, frame-options, CSP) sont retournés sur toutes les réponses.
- [ ] Les appels réseau sortants dynamiques vérifient et bloquent les adresses privées / boucle locale (anti-SSRF).
- [ ] Aucun secret ou mot de passe n'est présent dans le code source ni dans les logs.
