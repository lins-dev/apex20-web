/**
 * check-config.js
 * 
 * Valida se as configurações críticas de segurança estão presentes no .npmrc
 * antes de permitir qualquer instalação.
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_CONFIGS = [
  'ignore-scripts=true',
  'save-exact=true',
  'audit-level=high'
];

function main() {
  const npmrcPath = path.join(__dirname, '../.npmrc');
  
  if (!fs.existsSync(npmrcPath)) {
    console.error('🚨 ERRO: Arquivo .npmrc não encontrado na raiz do projeto!');
    process.exit(1);
  }

  const npmrc = fs.readFileSync(npmrcPath, 'utf8');
  const missing = REQUIRED_CONFIGS.filter(config => !npmrc.includes(config));

  if (missing.length > 0) {
    console.error('🚨 FALHA NA CONFIGURAÇÃO DE SEGURANÇA');
    console.error('As seguintes regras são obrigatórias no .npmrc:');
    missing.forEach(m => console.error(`   - ${m}`));
    console.error('\nPor favor, corrija o arquivo .npmrc antes de tentar instalar pacotes.');
    process.exit(1);
  }

  console.log('✅ Configurações de segurança do .npmrc validadas.');
}

main();
