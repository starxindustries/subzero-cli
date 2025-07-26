import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs-extra';
import simpleGit from 'simple-git';
import { CONFIG } from '../config';

export async function initCommand(projectName?: string, options?: { template?: string }) {
    try {
        // Get project name if not provided
        if (!projectName) {
            const response = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'projectName',
                    message: 'What is your project name?',
                    default: 'my-subzero-cli-project',
                    validate: (input: string) => {
                        if (!input || input.trim().length === 0) {
                            return 'Project name is required';
                        }
                        return true;
                    }
                }
            ]);
            projectName = response.projectName.trim();
        }

        const targetDir = projectName;
        const fullPath = path.resolve(process.cwd(), targetDir || '');

        // Check if directory already exists
        if (await fs.pathExists(fullPath)) {
            const { overwrite } = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'overwrite',
                    message: `Directory ${projectName} already exists. Do you want to overwrite it?`,
                    default: false
                }
            ]);

            if (!overwrite) {
                console.log(chalk.yellow('Operation cancelled.'));
                return;
            }

            await fs.remove(fullPath);
        }

        const spinner = ora('Initializing project...').start();

        try {
            // Clone the base template
            const git = simpleGit();
            await git.clone(CONFIG.baseRepo, fullPath, ['--depth', '1']);

            // Remove .git directory to start fresh
            await fs.remove(path.join(fullPath, '.git'));

            // Update package.json with project name
            const packageJsonPath = path.join(fullPath, 'package.json');
            if (await fs.pathExists(packageJsonPath)) {
                const packageJson = await fs.readJson(packageJsonPath);
                packageJson.name = projectName;
                await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
            }

            // Create subzero-cli config file
            const subzeroCLIConfig = {
                projectName,
                template: options?.template || 'default',
                installedModules: [],
                createdAt: new Date().toISOString()
            };

            await fs.writeJson(path.join(fullPath, 'subzero-cli.config.json'), subzeroCLIConfig, { spaces: 2 });

            spinner.succeed(chalk.green(`Project ${projectName} initialized successfully!`));

            console.log(chalk.blue('\nNext steps:'));
            console.log(chalk.gray(`  cd ${projectName}`));
            console.log(chalk.gray('  npm install'));
            console.log(chalk.gray('  npx subzero-cli add <module-name>  # to add modules'));

        } catch (error) {
            spinner.fail('Failed to initialize project');
            throw error;
        }

    } catch (error) {
        console.error(chalk.red('Error initializing project:'), error);
        process.exit(1);
    }
}