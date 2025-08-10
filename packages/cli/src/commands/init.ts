import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import validatePackageName from 'validate-npm-package-name';

import { logger } from '../utils/logger';
import { ProjectTemplate, createProject } from '../utils/project-generator';
import { validateNodeVersion } from '../utils/validators';

export const initCommand = new Command('init')
  .description('Initialize a new SubZero project')
  .argument('<project-name>', 'Name of the project')
  .option('-t, --template <template>', 'Project template: basic (minimal), business (auth+roles), enterprise (full-featured)', 'basic')
  .option('-d, --directory <directory>', 'Target directory (defaults to project name)')
  .option('--no-install', 'Skip dependency installation')
  .option('--no-git', 'Skip git initialization')
  .action(async (projectName: string, options) => {
    try {
      // Validate environment
      validateNodeVersion();

      // Validate project name
      const validation = validatePackageName(projectName);
      if (!validation.validForNewPackages) {
        logger.error(`Invalid project name: ${projectName}`);
        if (validation.errors) {
          validation.errors.forEach(error => logger.error(`  - ${error}`));
        }
        if (validation.warnings) {
          validation.warnings.forEach(warning => logger.warn(`  - ${warning}`));
        }
        process.exit(1);
      }

      // Determine target directory
      const targetDir = options.directory || projectName;
      const fullPath = path.resolve(targetDir);

      // Check if directory exists
      if (await fs.pathExists(fullPath)) {
        const { overwrite } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'overwrite',
            message: `Directory ${chalk.yellow(targetDir)} already exists. Overwrite?`,
            default: false,
          },
        ]);

        if (!overwrite) {
          logger.info('Project initialization cancelled.');
          return;
        }

        await fs.remove(fullPath);
      }

      // Validate template
      const validTemplates: ProjectTemplate[] = ['basic', 'business', 'enterprise'];
      if (!validTemplates.includes(options.template as ProjectTemplate)) {
        logger.error(`Invalid template: ${options.template}`);
        logger.info(`Available templates:`);
        logger.info(`  ${chalk.cyan('basic')} - Minimal Next.js setup`);
        logger.info(`  ${chalk.cyan('business')} - With authentication & roles`);
        logger.info(`  ${chalk.cyan('enterprise')} - Full-featured with all modules`);
        process.exit(1);
      }

      // Create project
      const spinner = ora(`Creating SubZero project with ${chalk.cyan(options.template)} template...`).start();
      
      await createProject({
        name: projectName,
        targetDir: fullPath,
        template: options.template as ProjectTemplate,
        installDependencies: options.install,
        initGit: options.git,
      });

      spinner.succeed('Project created successfully!');

      // Show next steps
      console.log('\n' + chalk.green('🎉 SubZero project created successfully!'));
      console.log('\n' + chalk.bold('📁 Project Details:'));
      console.log(`   Name: ${chalk.cyan(projectName)}`);
      console.log(`   Template: ${chalk.cyan(options.template)}`);
      console.log(`   Location: ${chalk.gray(fullPath)}`);
      
      console.log('\n' + chalk.bold('🚀 Next steps:'));
      console.log(`  ${chalk.cyan('cd')} ${targetDir}`);
      
      if (options.install) {
        console.log(`  ${chalk.cyan('subzero-cli add')} auth roles tables dashboard`);
        console.log(`  ${chalk.cyan('subzero-cli config')} --interactive`);
        console.log(`  ${chalk.cyan('subzero-cli dev')}`);
      } else {
        console.log(`  ${chalk.cyan('npm install')}`);
        console.log(`  ${chalk.cyan('subzero-cli add')} auth roles tables dashboard`);
        console.log(`  ${chalk.cyan('subzero-cli config')} --interactive`);
        console.log(`  ${chalk.cyan('subzero-cli dev')}`);
      }

      console.log('\n' + chalk.bold('📚 Resources:'));
      console.log(`  Documentation: ${chalk.blue('https://docs.subzero-cli.dev')}`);
      console.log(`  Issues: ${chalk.blue('https://github.com/subzero-cli/subzero/issues')}`);
      console.log(`  Community: ${chalk.blue('https://discord.gg/subzero-cli')}`);

    } catch (error) {
      logger.error('Failed to create project:', error);
      process.exit(1);
    }
  }); 