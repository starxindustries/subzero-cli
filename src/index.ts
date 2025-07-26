#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { addCommand } from './commands/add.js';

const program = new Command();

program
    .name('subzero-cli')
    .description('CLI tool to initialize projects and add modules')
    .version('1.0.0');

program
    .command('init')
    .description('Initialize a new project')
    .argument('[project-name]', 'Name of the project directory')
    .option('-t, --template <template>', 'Template to use', 'default')
    .action(initCommand);

program
    .command('add')
    .description('Add a module to the current project')
    .argument('<module-name>', 'Name of the module to add')
    .action(addCommand);

program.parse();