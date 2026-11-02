#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

// URL de base brute GitHub (configurable ou par défaut)
const GITHUB_RAW_BASE = process.env.DEVSTANDARD_REPO_RAW || 
  "https://raw.githubusercontent.com/username/devstandard/main";

async function loadRegistry() {
  // Si le fichier registry.json local existe (ex: en cours de dev dans le dépôt)
  const localRegistryPath = path.join(ROOT_DIR, "registry.json");
  if (fs.existsSync(localRegistryPath)) {
    return JSON.parse(fs.readFileSync(localRegistryPath, "utf-8"));
  }

  // Sinon, téléchargement depuis GitHub
  try {
    const res = await fetch(`${GITHUB_RAW_BASE}/registry.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("❌ Impossible de charger le registre des standards :", err.message);
    process.exit(1);
  }
}

async function getSkillContent(skillPath) {
  const localPath = path.join(ROOT_DIR, skillPath);
  if (fs.existsSync(localPath)) {
    return fs.readFileSync(localPath, "utf-8");
  }

  const url = `${GITHUB_RAW_BASE}/${skillPath}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Échec du téléchargement (${res.status}): ${url}`);
  return await res.text();
}

async function listSkills() {
  const registry = await loadRegistry();
  console.log("\n📦 DevStandard — Standards disponibles :");
  console.log("=========================================\n");

  const byDomain = {};
  for (const skill of registry.skills) {
    byDomain[skill.domain] = byDomain[skill.domain] || [];
    byDomain[skill.domain].push(skill);
  }

  for (const [domain, items] of Object.entries(byDomain)) {
    console.log(`🔷 Domaine : [${domain.toUpperCase()}]`);
    for (const item of items) {
      console.log(`  • ${item.name.padEnd(20)} - ${item.title}`);
      console.log(`    ${item.description}`);
      console.log(`    Commande : npx devstandard add ${item.name}\n`);
    }
  }
}

async function addSkill(skillName, targetDir = process.cwd()) {
  const registry = await loadRegistry();
  const skill = registry.skills.find(
    (s) => s.name.toLowerCase() === skillName.toLowerCase() || s.slug === skillName
  );

  if (!skill) {
    console.error(`\n❌ Skill "${skillName}" introuvable dans le registre.`);
    console.log("👉 Lancez `npx devstandard list` pour voir les skills disponibles.\n");
    process.exit(1);
  }

  console.log(`\n⏳ Récupération du standard [${skill.name}]...`);
  try {
    const content = await getSkillContent(skill.path);

    // Emplacement standard portable : <projet>/.agents/skills/<skill-name>/SKILL.md
    const destDir = path.join(targetDir, ".agents", "skills", skill.name);
    fs.mkdirSync(destDir, { recursive: true });

    const destFile = path.join(destDir, "SKILL.md");
    fs.writeFileSync(destFile, content, "utf-8");

    console.log(`✅ Skill installé avec succès !`);
    console.log(`📍 Emplacement : ${path.relative(process.cwd(), destFile)}`);
    console.log(`\n💡 Votre assistant IA (Cursor, Antigravity, Claude Code, etc.) appliquera désormais automatiquement ces règles pour ce projet.\n`);
  } catch (err) {
    console.error(`❌ Erreur lors de l'installation :`, err.message);
    process.exit(1);
  }
}

function printHelp() {
  console.log(`
DevStandard AI — CLI de distribution des standards d'ingénierie logicielle

Utilisation :
  npx devstandard list              Affiche tous les standards disponibles
  npx devstandard add <nom-skill>   Installe le standard dans votre projet (.agents/skills/)
  npx devstandard --help            Affiche cette aide
  `);
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  if (command === "list" || command === "ls") {
    await listSkills();
    return;
  }

  if (command === "add" || command === "install") {
    const skillName = args[1];
    const targetDir = args[2] || process.cwd();
    if (!skillName) {
      console.error("❌ Veuillez préciser le nom du skill à installer.");
      console.log("Exemple : npx devstandard add design-tokens");
      process.exit(1);
    }
    await addSkill(skillName, targetDir);
    return;
  }

  console.error(`Commande inconnue : ${command}`);
  printHelp();
  process.exit(1);
}

main().catch((err) => {
  console.error("Erreur inattendue :", err);
  process.exit(1);
});
