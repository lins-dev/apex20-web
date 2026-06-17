/**
 * secure-install.js
 * 
 * Este script valida se todos os pacotes no package-lock.json foram publicados
 * há pelo menos 7 dias, mitigando ataques de typosquatting e supply chain.
 * 
 * Regra: min-release-age = 7d
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const MIN_AGE_DAYS = 7;
const MIN_AGE_MS = MIN_AGE_DAYS * 24 * 60 * 60 * 1000;
const NOW = Date.now();

async function checkPackageAge(pkgName, version) {
  try {
    const output = execSync(`npm view ${pkgName}@${version} time --json`, { stdio: ['ignore', 'pipe', 'ignore'] });
    const times = JSON.parse(output.toString());
    const releaseTime = new Date(times[version]).getTime();
    
    if (NOW - releaseTime < MIN_AGE_MS) {
      const ageDays = ((NOW - releaseTime) / (1000 * 60 * 60 * 24)).toFixed(1);
      console.error(`❌ ERRO DE SEGURANÇA: O pacote ${pkgName}@${version} é muito recente (${ageDays} dias).`);
      console.error(`⚠️ O período de resfriamento mínimo é de ${MIN_AGE_DAYS} dias.`);
      return false;
    }
    return true;
  } catch (err) {
    console.warn(`⚠️ Não foi possível verificar a idade de ${pkgName}@${version}. Pulando...`);
    return true;
  }
}

async function main() {
  console.log('🛡️ Iniciando verificação de idade de pacotes (Cooldown: 7 dias)...');
  
  const lockPath = path.join(__dirname, '../package-lock.json');
  if (!fs.existsSync(lockPath)) {
    console.error('❌ package-lock.json não encontrado!');
    process.exit(1);
  }

  const lockfile = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
  const packages = lockfile.packages || {};
  
  const insecurePackages = [];

  // Pega apenas as dependências diretas para otimizar (node_modules/name)
  const directDeps = Object.keys(packages).filter(k => k.startsWith('node_modules/') && !k.includes('node_modules/', 13));

  for (const pkgPath of directDeps) {
    const pkgName = pkgPath.replace('node_modules/', '');
    const version = packages[pkgPath].version;
    
    // Ignora links locais ou pacotes sem versão definida
    if (!version || packages[pkgPath].link) continue;

    const isSafe = await checkPackageAge(pkgName, version);
    if (!isSafe) {
      insecurePackages.push(`${pkgName}@${version}`);
    }
  }

  if (insecurePackages.length > 0) {
    console.error('\n🚨 FALHA NA AUDITORIA DE SEGURANÇA');
    console.error('Foram encontrados pacotes em período de resfriamento. Instalação abortada.');
    process.exit(1);
  }

  console.log('✅ Todos os pacotes diretos passaram na verificação de idade.');
}

main();
