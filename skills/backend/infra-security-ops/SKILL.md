---
name: backend-infra-security-ops
description: "Standards stricts de sécurisation de l'infrastructure et configuration système (DevSecOps) : pare-feu default-deny, isolation réseau privée pour BDD/Redis, durcissement SSH, reverse proxy TLS, moindre privilège DB et audits de dépendances."
---

# Backend Infrastructure & Ops Security Standard

Ce skill formalise les exigences impératives pour l'administration système, l'architecture réseau et la sécurisation des environnements d'hébergement (serveurs dédiés, VPS, conteneurs Docker, Kubernetes ou Cloud).

---

## 1. Sécurité Réseau & Pare-Feu (Firewalling)

1. **Politique du rejet par défaut (Default Deny) :**
   Le pare-feu hôte (`ufw`, `iptables`, `nftables`, AWS Security Groups) doit bloquer tous les flux entrants par défaut et n'autoriser que les ports explicitement déclarés.
2. **Ports ouverts vers Internet :**
   - **Seuls les ports `80` (HTTP) et `443` (HTTPS)** peuvent être exposés publiquement sur Internet.
   - Le port `80` doit systématiquement rediriger vers le port `443` avec un statut `301 Moved Permanently`.
3. **Isolation stricte des services de données (Zero Exposure) :**
   - Les moteurs de base de données (PostgreSQL, MySQL, MariaDB, MongoDB) et caches mémoires (Redis, Memcached) ne doivent **JAMAIS** écouter sur `0.0.0.0` ni être exposés sur une IP publique.
   - Ils doivent être configurés pour écouter uniquement sur `127.0.0.1` (localhost) ou sur un réseau privé isolé (VPC privé, sous-réseau Docker interne non mappé à l'hôte).

---

## 2. Durcissement de l'Accès SSH (Bastion & Administration)

Tout accès distant d'administration par SSH doit appliquer les directives suivantes dans `/etc/ssh/sshd_config` :

| Directive SSH | Valeur obligatoire | Justification |
| :--- | :--- | :--- |
| `PermitRootLogin` | `no` | Empêche la connexion directe avec le super-administrateur root. |
| `PasswordAuthentication` | `no` | Élimine les attaques par force brute sur les mots de passe. |
| `PubkeyAuthentication` | `yes` | Force l'authentification par clé cryptographique forte (ed25519 ou RSA ≥ 4096 bits). |
| `MaxAuthTries` | `3` | Déconnexion rapide en cas d'échecs répétitifs. |
| `X11Forwarding` | `no` | Désactive les fonctionnalités graphiques superflues. |

- **Protection anti-brute force :** Installer et activer systématiquement `fail2ban` ou un service équivalent pour bannir automatiquement les adresses IP après plusieurs échecs de connexion.
- **Accès restreint :** Idéalement, restreindre l'accès au port SSH à une adresse IP fixe de l'entreprise ou à travers un VPN / tunnel sécurisé (WireGuard, Tailscale, Cloudflare Zero Trust).

---

## 3. Reverse Proxy, TLS & WAF (Frontal Web)

1. **Architecture avec Reverse Proxy Dédié :**
   L'application backend (Node.js, Python, PHP-FPM, Go) ne doit jamais être exposée directement sur le port 443 sans intermédiaire. Utiliser un reverse proxy robuste en amont (Nginx, Caddy, HAProxy, ou Cloudflare).
2. **Configuration TLS Imperméable :**
   - Activer uniquement **TLS 1.2** et **TLS 1.3** ; désactiver formellement SSL v2, SSL v3, TLS 1.0 et TLS 1.1.
   - Certificats renouvelés automatiquement (Let's Encrypt / ACME) avec renouvellement automatique testé.
3. **Pare-feu Applicatif Web (WAF) :**
   Activer un WAF (Cloudflare WAF, ModSecurity, AWS WAF) pour filtrer les scanners automatisés, botnets, attaques par déni de service (DDoS) et tentatives d'exploitation de vulnérabilités connues (CVE).

---

## 4. Principe du Moindre Privilège en Base de Données

1. **Aucun utilisateur super-administrateur en production :**
   L'application ne doit jamais se connecter à la base de données avec l'utilisateur `postgres`, `root` ou `sa`.
2. **Droits DML stricts :**
   L'utilisateur applicatif ne doit posséder que les privilèges de manipulation de données nécessaires à son fonctionnement :
   ```sql
   GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
   ```
   Interdire formellement les privilèges d'altération de structure (`DROP`, `ALTER`, `GRANT`) pour le compte applicatif quotidien. Les migrations de schéma doivent être exécutées par un compte de déploiement distinct.

---

## 5. Sécurité de la Chaîne d'Approvisionnement (Supply Chain & Audit)

1. **Audit automatisé des dépendances :**
   Intégrer dans la chaîne CI/CD une vérification systématique bloquante contre les vulnérabilités connues :
   - Node.js : `npm audit --audit-level=high`
   - Python : `pip-audit` ou `safety`
   - Conteneurs : `trivy image <nom-image>`
2. **Fichiers de verrouillage stricts :**
   Toujours versionner dans Git les fichiers de lock (`package-lock.json`, `pnpm-lock.yaml`, `poetry.lock`, `Pipfile.lock`, `composer.lock`) et déployer sur les serveurs avec `npm ci` (et non `npm install`) pour garantir des builds 100% reproductibles.

---

## 6. Sauvegardes & Continuité d'Activité

1. **Règle 3-2-1 :**
   - **3** copies des données au total.
   - Sur **2** supports différents.
   - Dont **1** copie externalisée hors site (sur un bucket S3 chiffré dans une région distincte).
2. **Chiffrement des sauvegardes :**
   Toutes les sauvegardes (dumps de base de données, snapshots de volumes) doivent être chiffrées au repos avec AES-256 avant tout transfert réseau.
3. **Tests de restauration périodiques :**
   Une sauvegarde n'est valide que si sa restauration a été testée avec succès sur un environnement de test.

---

## 7. Checklist de Validation du Développeur / Agent

- [ ] Seuls les ports 80 et 443 sont accessibles depuis l'extérieur.
- [ ] La base de données et Redis ne sont accessibles que depuis localhost ou le réseau privé interne.
- [ ] La connexion SSH par mot de passe et l'accès root direct sont désactivés.
- [ ] Le trafic HTTPS utilise TLS 1.2+ avec redirection automatique depuis le HTTP.
- [ ] L'utilisateur de base de données de l'application n'a pas les droits superuser ni les droits DROP.
- [ ] La chaîne CI/CD audite et bloque les dépendances tierces contenant des CVE critiques.
- [ ] Les sauvegardes automatiques sont chiffrées et envoyées sur un stockage distant isolé.
