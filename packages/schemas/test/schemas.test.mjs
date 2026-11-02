import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { readSchema, readExample, schemaPath, schemaNames } from '../index.mjs';

const ajv = new Ajv2020({ strict: true, allErrors: true });
addFormats(ajv);

const validators = {
  standard: ajv.compile(readSchema('standard')),
  'project-brief': ajv.compile(readSchema('project-brief')),
  'pack-manifest': ajv.compile(readSchema('pack-manifest')),
  platforms: ajv.compile(readSchema('platforms')),
};

const readJson = (url) => JSON.parse(readFileSync(url, 'utf8'));
const registry = readJson(fileURLToPath(new URL('../platforms.json', import.meta.url)));
const clone = (value) => structuredClone(value);

function assertValid(schemaName, document, label) {
  const valid = validators[schemaName](document);
  assert.equal(
    valid,
    true,
    `${label} devrait être valide :\n${JSON.stringify(validators[schemaName].errors, null, 2)}`,
  );
}

function assertInvalid(schemaName, document, label) {
  assert.equal(validators[schemaName](document), false, `${label} devrait être rejeté`);
}

const frontendStandard = readExample('frontend-semantic-color-system.standard');
const backendStandard = readExample('backend-server-side-validation.standard');
const projectBrief = readExample('public-service.project-brief');
const packManifest = readExample('public-service.pack-manifest');

test('les schémas déclarent JSON Schema 2020-12', () => {
  for (const name of schemaNames()) {
    const schema = readJson(schemaPath(name));
    assert.equal(schema.$schema, 'https://json-schema.org/draft/2020-12/schema', name);
    assert.ok(schema.$id?.startsWith('https://devstandard.ai/schemas/'), name);
  }
});

test('le schéma standard exige les métadonnées du dossier de référence (§6)', () => {
  const schema = readJson(schemaPath('standard'));
  const mandated = [
    'id',
    'slug',
    'title',
    'domain',
    'category',
    'priority',
    'status',
    'version',
    'applies_to',
    'conditions',
    'dependencies',
    'conflicts',
    'rule',
    'rationale',
    'requirements',
    'anti_patterns',
    'validation',
    'sources',
    'license',
    'reviewed_at',
  ];
  for (const field of mandated) {
    assert.ok(
      schema.required.includes(field) || field in schema.properties,
      `le champ "${field}" doit exister dans le schéma`,
    );
  }
  const mandatory = ['id', 'slug', 'title', 'domain', 'category', 'priority', 'status', 'version', 'rule', 'rationale', 'sources'];
  for (const field of mandatory) {
    assert.ok(schema.required.includes(field), `"${field}" doit être obligatoire`);
  }
});

test('les exemples éditoriaux sont valides', () => {
  assertValid('standard', frontendStandard, 'standard frontend');
  assertValid('standard', backendStandard, 'standard backend');
  assertValid('project-brief', projectBrief, 'brief projet');
  assertValid('pack-manifest', packManifest, 'manifeste de pack');
});

test('le registre des plateformes est valide et cohérent', () => {
  assertValid('platforms', registry, 'registre des plateformes');

  const ids = registry.platforms.map((platform) => platform.id);
  assert.equal(new Set(ids).size, ids.length, 'les identifiants de plateforme doivent être uniques');

  const statuses = new Set(openStatuses(registry));
  for (const platform of registry.platforms) {
    assert.ok(statuses.has(platform.status), `statut inconnu pour ${platform.id}`);
    if (platform.status !== 'not_verified') {
      assert.match(
        String(platform.verified_at),
        /^\d{4}-\d{2}-\d{2}$/,
        `${platform.id} doit porter une date de vérification`,
      );
    }
  }

  for (const name of ['project-brief', 'pack-manifest']) {
    const schema = readJson(schemaPath(name));
    const key = name === 'project-brief' ? 'target_assistant' : 'target';
    assert.deepEqual(
      [...schema.properties[key].enum].sort(),
      [...ids].sort(),
      `l'énumération ${key} doit correspondre au registre des plateformes`,
    );
  }
});

function openStatuses(source) {
  return source.delivery_statuses;
}

test('un standard sans source, règle ou justification est rejeté', () => {
  const withoutSources = clone(frontendStandard);
  delete withoutSources.sources;
  assertInvalid('standard', withoutSources, 'standard sans sources');

  const withoutRule = clone(frontendStandard);
  delete withoutRule.rule;
  assertInvalid('standard', withoutRule, 'standard sans règle');

  const emptyRationale = clone(frontendStandard);
  emptyRationale.rationale = 'trop court';
  assertInvalid('standard', emptyRationale, 'justification insuffisante');
});

test('identifiants, priorités et versions invalides sont rejetés', () => {
  const badId = clone(frontendStandard);
  badId.id = 'FE-1';
  assertInvalid('standard', badId, 'identifiant non stable');

  const badPriority = clone(frontendStandard);
  badPriority.priority = 'highest';
  assertInvalid('standard', badPriority, 'priorité hors nomenclature');

  const badVersion = clone(frontendStandard);
  badVersion.version = '1.0';
  assertInvalid('standard', badVersion, 'version non semver');

  const badStatus = clone(frontendStandard);
  badStatus.status = 'live';
  assertInvalid('standard', badStatus, 'statut hors workflow éditorial');
});

test('la catégorie doit appartenir au domaine', () => {
  const mismatch = clone(frontendStandard);
  mismatch.category = 'database';
  assertInvalid('standard', mismatch, 'catégorie backend sur un standard frontend');
});

test('les champs inconnus et les URL non sécurisées sont rejetés', () => {
  const extra = clone(frontendStandard);
  extra.freeform = 'valeur non gouvernée';
  assertInvalid('standard', extra, 'champ inconnu');

  const insecureSource = clone(frontendStandard);
  insecureSource.sources[0].url = 'http://exemple.test/page';
  assertInvalid('standard', insecureSource, 'source non HTTPS');

  const noChecks = clone(frontendStandard);
  noChecks.validation.checks = [];
  assertInvalid('standard', noChecks, 'aucun contrôle de validation');
});

test('le brief projet exige une stack résolue et une plateforme cible connue', () => {
  const withoutStack = clone(projectBrief);
  delete withoutStack.stack;
  assertInvalid('project-brief', withoutStack, 'brief sans stack');

  const unknownFramework = clone(projectBrief);
  unknownFramework.stack.frontend_framework = 'ember';
  assertInvalid('project-brief', unknownFramework, 'framework hors liste supportée');

  const unknownAssistant = clone(projectBrief);
  unknownAssistant.target_assistant = 'some-agent';
  assertInvalid('project-brief', unknownAssistant, 'plateforme non répertoriée');

  const messagingTarget = clone(projectBrief);
  messagingTarget.target_assistant = 'whatsapp-web';
  assertValid('project-brief', messagingTarget, 'surface de messagerie répertoriée');
});

test('un pack ne peut pas être "passed" avec un échec ou un contrôle ignoré', () => {
  const withFailure = clone(packManifest);
  withFailure.validation.summary.fail = 1;
  assertInvalid('pack-manifest', withFailure, 'pack passed avec un échec');

  const withSkipped = clone(packManifest);
  withSkipped.validation.summary.skipped = 2;
  assertInvalid('pack-manifest', withSkipped, 'pack passed avec des contrôles ignorés');

  const blocked = clone(packManifest);
  blocked.validation.status = 'blocked';
  blocked.validation.summary.fail = 2;
  assertValid('pack-manifest', blocked, 'pack bloqué avec échecs');

  const arbitraryStatus = clone(packManifest);
  arbitraryStatus.validation.checks[0].status = 'unknown';
  assertInvalid('pack-manifest', arbitraryStatus, 'statut de contrôle hors nomenclature');
});

test("le manifeste protège contre les chemins d'archive dangereux", () => {
  const traversal = clone(packManifest);
  traversal.files[0].path = '../etc/passwd';
  assertInvalid('pack-manifest', traversal, 'chemin avec traversée');

  const absolute = clone(packManifest);
  absolute.files[0].path = '/etc/passwd';
  assertInvalid('pack-manifest', absolute, 'chemin absolu');

  const badHash = clone(packManifest);
  badHash.files[0].sha256 = 'not-a-hash';
  assertInvalid('pack-manifest', badHash, 'empreinte invalide');
});
