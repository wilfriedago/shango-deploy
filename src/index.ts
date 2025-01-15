#!/usr/bin/env node

import { Command } from 'commander';
import { add } from './commands/add.js';
import { kamal } from './commands/kl.js';
import { provision } from './commands/provision.js';

const program = new Command();

program
  .name('shango')
  .description('Deploy your web app anywhere')
  .version('0.0.1');

program
  .command('provision')
  .description('Provision servers with required configurations')
  .argument('[environment]', 'Target environment (staging/production)')
  .action(provision);

program
  .command('add')
  .description('Generate a new Shango configuration')
  .action(add);

program
  .command('kl')
  .argument('[cmd...]')
  .description('This is an alias to the kamal deploy')
  .action(kamal);


program
  .command('sync-secrets')
  .description('Synchronize secrets to GitHub')
  .requiredOption('--owner <owner>', 'GitHub repository owner')
  .requiredOption('--repo <repo>', 'GitHub repository name')
  .requiredOption('--token <token>', 'GitHub personal access token')
  .action(syncSecrets);

program.parse();
