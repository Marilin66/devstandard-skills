import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const PACKAGE_ROOT = new URL('.', import.meta.url);

export const SCHEMAS = Object.freeze({
  standard: 'standard.schema.json',
  'project-brief': 'project-brief.schema.json',
  'pack-manifest': 'pack-manifest.schema.json',
  platforms: 'platforms.schema.json',
});

/** Noms des schémas disponibles. */
export function schemaNames() {
  return Object.keys(SCHEMAS);
}

/**
 * Chemin absolu d'un schéma partagé, utilisable par un script Node ou monté
 * pour le moteur Python (`/schemas` dans Docker Compose).
 */
export function schemaPath(name) {
  const file = SCHEMAS[name];
  if (!file) {
    throw new Error(`Schéma inconnu : "${name}". Disponibles : ${schemaNames().join(', ')}`);
  }
  return fileURLToPath(new URL(file, PACKAGE_ROOT));
}

/** Contenu JSON du schéma. */
export function readSchema(name) {
  return JSON.parse(readFileSync(schemaPath(name), 'utf8'));
}

/** Contenu JSON d'un exemple éditorial, ex. "frontend-semantic-color-system.standard". */
export function readExample(name) {
  return JSON.parse(readFileSync(fileURLToPath(new URL(`examples/${name}.json`, PACKAGE_ROOT)), 'utf8'));
}

export default { SCHEMAS, schemaNames, schemaPath, readSchema, readExample };
