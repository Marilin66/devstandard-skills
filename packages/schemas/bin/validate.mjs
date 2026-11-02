#!/usr/bin/env node
// Valide un document JSON contre un schéma canonique.
// Usage : node bin/validate.mjs <standard|project-brief|pack-manifest> <fichier.json>
import { readFileSync } from 'node:fs';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { readSchema, schemaNames } from '../index.mjs';

const [schemaName, file] = process.argv.slice(2);

if (!schemaName || !file) {
  console.error(`Usage : devstandard-validate <${schemaNames().join('|')}> <fichier.json>`);
  process.exit(2);
}

let document;
try {
  document = JSON.parse(readFileSync(file, 'utf8'));
} catch (error) {
  console.error(`Lecture impossible de ${file} : ${error.message}`);
  process.exit(2);
}

const ajv = new Ajv2020({ strict: true, allErrors: true });
addFormats(ajv);
const validate = ajv.compile(readSchema(schemaName));

if (validate(document)) {
  console.log(`OK — ${file} est conforme au schéma "${schemaName}".`);
  process.exit(0);
}

console.error(`INVALIDE — ${file} ne respecte pas le schéma "${schemaName}" :`);
for (const err of validate.errors ?? []) {
  const where = err.instancePath || '(racine)';
  console.error(`  - ${where} ${err.message}${err.params ? ` ${JSON.stringify(err.params)}` : ''}`);
}
process.exit(1);
