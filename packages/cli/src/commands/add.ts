import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';

import { logger } from '../utils/logger';
import { validateModuleName } from '../utils/validators';
// import { addModuleToProject } from '../utils/module-manager';
// import { loadSubZeroConfig } from '../utils/config-loader';

export const addCommand = new Command('add')
  .description('Add modules to your SubZero project')
  .argument('[modules...]', 'Module names to add (auth, roles, tables, forms, dashboard, files, notifications)')
  .option('-i, --interactive', 'Interactive module selection')
  .option('--no-install', 'Skip module installation')
  .option('--no-config', 'Skip configuration generation')
  .action(async (modules: string[], options) => {
    try {
      // Check if we're in a SubZero project
      // const config = await loadSubZeroConfig();
      // if (!config) {
      //   logger.error('Not in a SubZero project directory.');
      //   logger.info('Run "subzero-cli init <project-name>" to create a new project.');
      //   process.exit(1);
      // }

      // let modulesToAdd = modules;

      // // Interactive mode
      // if (options.interactive || modulesToAdd.length === 0) {
      //   const availableModules = [
      //     { name: 'auth', description: 'Authentication & user management' },
      //     { name: 'roles', description: 'Role-based access control' },
      //     { name: 'tables', description: 'Data tables with CRUD operations' },
      //     { name: 'forms', description: 'Dynamic form generation' },
      //     { name: 'dashboard', description: 'Analytics and dashboard widgets' },
      //     { name: 'files', description: 'File upload and management' },
      //     { name: 'notifications', description: 'Real-time notifications' }
      //   ];

      //   const installedModules = config.modules || [];
      //   const notInstalledModules = availableModules.filter(
      //     m => !installedModules.includes(m.name)
      //   );

      //   if (notInstalledModules.length === 0) {
      //     logger.info('All available modules are already installed.');
      //     return;
      //   }

      //   const { selectedModules } = await inquirer.prompt([
      //     {
      //       type: 'checkbox',
      //       name: 'selectedModules',
      //       message: 'Select modules to add:',
      //       choices: notInstalledModules.map(module => ({
      //         name: `${chalk.cyan(module.name)} - ${module.description}`,
      //         value: module.name
      //       }))
      //     }
      //   ]);

      //   modulesToAdd = selectedModules;
      // }

      // if (modulesToAdd.length === 0) {
      //   logger.info('No modules selected.');
      //   return;
      // }

      // // Validate modules
      // const invalidModules = modulesToAdd.filter(m => !validateModuleName(m));
      // if (invalidModules.length > 0) {
      //   logger.error(`Invalid modules: ${invalidModules.join(', ')}`);
      //   logger.info('Available modules: auth, roles, tables, forms, dashboard, files, notifications');
      //   process.exit(1);
      // }

      // // Check for already installed modules
      // const installedModules = config.modules || [];
      // const alreadyInstalled = modulesToAdd.filter(m => installedModules.includes(m));
      
      // if (alreadyInstalled.length > 0) {
      //   logger.warn(`Already installed: ${alreadyInstalled.join(', ')}`);
      //   modulesToAdd = modulesToAdd.filter(m => !alreadyInstalled.includes(m));
      // }

      // if (modulesToAdd.length === 0) {
      //   logger.info('No new modules to install.');
      //   return;
      // }

      // // Add modules
      // logger.header('Adding Modules');
      
      // for (let i = 0; i < modulesToAdd.length; i++) {
      //   const module = modulesToAdd[i];
      //   logger.step(i + 1, modulesToAdd.length, `Adding ${chalk.cyan(module)} module...`);
        
      //   const spinner = ora(`Installing ${module}...`).start();
        
      //   try {
      //     await addModuleToProject(module, {
      //       installDependencies: options.install,
      //       generateConfig: options.config
      //     });
          
      //     spinner.succeed(`${chalk.green(module)} module added successfully`);
      //   } catch (error) {
      //     spinner.fail(`Failed to add ${module} module`);
      //     throw error;
      //   }
      // }

      // // Update SubZero config
      // const updatedConfig = {
      //   ...config,
      //   modules: [...(config.modules || []), ...modulesToAdd]
      // };

      // await fs.writeFile(
      //   path.join(process.cwd(), 'config/subzero.json'),
      //   JSON.stringify(updatedConfig, null, 2)
      // );

      // logger.newLine();
      // logger.success(`Successfully added ${modulesToAdd.length} module(s): ${modulesToAdd.join(', ')}`);
      
      // // Show next steps
      // console.log('\n' + chalk.bold('Next steps:'));
      // console.log(`  ${chalk.cyan('subzero-cli config')} --interactive  # Configure your modules`);
      // console.log(`  ${chalk.cyan('subzero-cli deploy')} --schemas     # Deploy database schemas`);
      // console.log(`  ${chalk.cyan('subzero-cli dev')}                 # Start development server`);

    } catch (error) {
      logger.error('Failed to add modules:', error);
      process.exit(1);
    }
  }); 