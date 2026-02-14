#!/usr/bin/env node

import chalk from 'chalk';

import { runInitCommand } from './commands/init';
import { runMapCommand } from './commands/map';

function printHelp(): void {
  console.log(`\n${chalk.bold('Landmaker CLI')}\n`);
  console.log('Uso:');
  console.log(`  ${chalk.cyan('landmaker init')}  Crea o repara landmaker.config.json.`);
  console.log(`  ${chalk.cyan('landmaker map')}   Muestra la estructura actual de páginas y secciones.`);
}

function main(): void {
  const command = process.argv[2];

  switch (command) {
    case 'init':
      runInitCommand(process.cwd());
      return;
    case 'map':
      runMapCommand(process.cwd());
      return;
    case undefined:
      printHelp();
      return;
    default:
      console.log(chalk.red(`Comando desconocido: ${command}`));
      printHelp();
  }
}

main();
