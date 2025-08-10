#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import updateNotifier from 'update-notifier';

import { initCommand } from '../commands/init';
import { addCommand } from '../commands/add';
import { logger } from '../utils/logger';
// import { configCommand } from '../commands/config';
// import { deployCommand } from '../commands/deploy';
// import { devCommand } from '../commands/dev';
// import { buildCommand } from '../commands/build';
// import { doctorCommand } from '../commands/doctor';
// import { listCommand } from '../commands/list';
// import { removeCommand } from '../commands/remove';
// import { updateCommand } from '../commands/update';

const pkg = require('../../package.json');

// Check for updates
updateNotifier({
  pkg,
  updateCheckInterval: 1000 * 60 * 60 * 24, // 24 hours
}).notify();

// Global error handling
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Main program
program
  .name('subzero-cli')
  .description('🚀 SubZero CLI - Modular Next.js Application Generator')
  .version(pkg.version, '-v, --version', 'Display version number')
  .option('--verbose', 'Enable verbose logging')
  .option('--no-color', 'Disable colored output')
  .option('--silent', 'Suppress all output except errors')
  .hook('preAction', (thisCommand, actionCommand) => {
    // Set global verbose mode
    const opts = thisCommand.opts();
    if (opts.verbose) {
      process.env.SUBZERO_VERBOSE = 'true';
    }
    if (opts.silent) {
      process.env.SUBZERO_SILENT = 'true';
    }
    if (opts.noColor) {
      process.env.NO_COLOR = 'true';
    }
  });

// Commands
program.addCommand(initCommand);
program.addCommand(addCommand);
// program.addCommand(configCommand);
// program.addCommand(deployCommand);
// program.addCommand(devCommand);
// program.addCommand(buildCommand);
// program.addCommand(doctorCommand);
// program.addCommand(listCommand);
// program.addCommand(removeCommand);
// program.addCommand(updateCommand);

// Handle unknown commands
program.on('command:*', () => {
  console.error(
    chalk.red(`\n❌ Unknown command: ${chalk.yellow(program.args.join(' '))}\n`)
  );
  console.log(chalk.cyan('💡 Run "subzero-cli --help" for available commands.'));
  console.log(chalk.gray('\n📚 Documentation: https://docs.subzero-cli.dev'));
  process.exit(1);
});

// Custom help
program.configureHelp({
  sortSubcommands: true,
  subcommandTerm: (cmd) => cmd.name() + ' ' + cmd.usage(),
});

// Parse arguments
program.parse();

// Show help if no command provided
if (!process.argv.slice(2).length) {
  console.log(chalk.cyan('🚀 Welcome to SubZero CLI!\n'));
  program.outputHelp();
  console.log(chalk.gray('\n💡 Start with: subzero-cli init my-app'));
  console.log(chalk.gray('📚 Documentation: https://docs.subzero-cli.dev'));
} 