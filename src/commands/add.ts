import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import fs from 'fs-extra';
import { execa } from 'execa';
import simpleGit from 'simple-git';
import { glob } from 'glob';
import { CONFIG } from '../config';

interface subzeroCLIConfig {
    projectName: string;
    template: string;
    installedModules: string[];
    createdAt: string;
}

function mergeDeps(target: any, field: string, deps: string[] = []) {
    if (!deps || !Array.isArray(deps)) {
        console.log(chalk.red(`[SKIP] No ${field} array provided.`));
        return;
    }
    if (!target[field]) target[field] = {};

    deps.forEach((dep) => {
        // Find the last @, which separates package from version
        const lastAt = dep.lastIndexOf('@');
        if (lastAt <= 0) {
            // No version, or malformed
            console.log(chalk.red(`[SKIP] Could not parse ${field}: ${dep}`));
            return;
        }
        const pkg = dep.slice(0, lastAt);
        const version = dep.slice(lastAt + 1);
        if (!pkg.trim()) {
            console.log(chalk.red(`[SKIP] Empty package name in ${field}: ${dep}`));
            return;
        }
        if (!version.trim()) {
            target[field][pkg] = 'latest';
            console.log(chalk.gray(`[ADD] ${field}: ${pkg}@latest (no version)`));
        } else {
            target[field][pkg] = version;
            console.log(chalk.gray(`[ADD] ${field}: ${pkg}@${version}`));
        }
    });
}



async function processModuleFiles(modulePath: string, projectPath: string, moduleConfig: any) {
    // Get all files in the module (excluding config files and git files)
    const files = await glob('**/*', {
        cwd: modulePath,
        nodir: true,
        ignore: ['**/.git/**', '**/node_modules/**', 'module.config.json', 'README.md']
    });

    for (const file of files) {
        const sourcePath = path.join(modulePath, file);
        const relativePath = path.dirname(file);
        const fileName = path.basename(file);

        // Determine target directory based on file location or custom mapping
        let targetDir = determineTargetDirectory(relativePath, fileName, moduleConfig);

        let finalTargetPath: string;

        if (!targetDir) {
            // If no specific mapping, maintain the same structure
            finalTargetPath = path.join(projectPath, file);
        } else {
            // Clean up the target directory path (remove leading slash if present)
            const cleanTargetDir = targetDir.startsWith('/') ? targetDir.slice(1) : targetDir;
            finalTargetPath = path.join(projectPath, cleanTargetDir, fileName);
        }

        // Ensure the target directory exists (not just its parent)
        await fs.ensureDir(path.dirname(finalTargetPath));

        // Copy the file
        await fs.copy(sourcePath, finalTargetPath);

        console.log(chalk.gray(`  ✓ ${file} → ${path.relative(projectPath, finalTargetPath)}`));
    }
}


function determineTargetDirectory(relativePath: string, fileName: string, moduleConfig: any): string | null {
    // Check if module has custom file mappings
    if (moduleConfig.fileMappings) {
        for (const mapping of moduleConfig.fileMappings) {
            if (relativePath.includes(mapping.from)) {
                return mapping.to;
            }
        }
    }

    // Use default directory mappings from config
    for (const [dirName, targetPath] of Object.entries(CONFIG.directoryMapping)) {
        if (relativePath.includes(dirName)) {
            return targetPath;
        }
    }

    // Check file extensions for common patterns
    const ext = path.extname(fileName);
    const baseName = path.basename(fileName, ext);

    // Type definitions
    if (fileName.endsWith('.d.ts') || baseName.includes('types') || baseName.includes('interface')) {
        return CONFIG.directoryMapping.types;
    }

    // React components
    if ((ext === '.tsx' || ext === '.jsx')) {
        if (relativePath.includes('ui') || baseName.toLowerCase().includes('ui')) {
            return CONFIG.directoryMapping.ui;
        }
        return CONFIG.directoryMapping.components;
    }

    // Utilities
    if (baseName.includes('util') || baseName.includes('helper')) {
        return CONFIG.directoryMapping.utils;
    }

    // Hooks
    if (baseName.startsWith('use') && (ext === '.ts' || ext === '.tsx')) {
        return CONFIG.directoryMapping.hooks;
    }

    // Styles
    if (ext === '.css' || ext === '.scss' || ext === '.sass' || ext === '.less') {
        return CONFIG.directoryMapping.styles;
    }

    return null;
}

export async function addCommand(moduleName: string) {
    try {
        const configPath = path.join(process.cwd(), 'subzero-cli.config.json');
        if (!await fs.pathExists(configPath)) {
            console.error(chalk.red('Error: Not in a subzero-cli project directory. Run "subzero-cli init" first.'));
            return;
        }

        if (!CONFIG.modules[moduleName as keyof typeof CONFIG.modules]) {
            console.error(chalk.red(`Error: Module "${moduleName}" not found.`));
            console.log(chalk.gray('Available modules:'));
            Object.keys(CONFIG.modules).forEach(module => {
                console.log(chalk.gray(`  - ${module}`));
            });
            return;
        }

        const config: subzeroCLIConfig = await fs.readJson(configPath);
        if (config.installedModules.includes(moduleName)) {
            console.log(chalk.yellow(`Module "${moduleName}" is already installed.`));
            return;
        }

        const spinner = ora(`Adding module ${moduleName}...`).start();

        try {
            const tempPath = path.join(process.cwd(), CONFIG.tempDir);
            const modulePath = path.join(tempPath, moduleName);

            await fs.remove(tempPath);
            await fs.ensureDir(tempPath);

            const git = simpleGit();
            await git.clone(CONFIG.modules[moduleName as keyof typeof CONFIG.modules], modulePath, ['--depth', '1']);
            await fs.remove(path.join(modulePath, '.git'));

            // Read module config if it exists
            const moduleConfigPath = path.join(modulePath, 'module.config.json');
            let moduleConfig: any = {};
            if (await fs.pathExists(moduleConfigPath)) {
                moduleConfig = await fs.readJson(moduleConfigPath);
                console.log(chalk.blue('Module config dependencies:'), {
                    deps: moduleConfig.dependencies,
                    devDeps: moduleConfig.devDependencies,
                    peerDeps: moduleConfig.peerDependencies,
                });
            } else {
                spinner.fail(chalk.red(`No module.config.json in ${moduleName}`));
                await fs.remove(tempPath);
                return;
            }

            // --- PACKAGE.JSON MERGING LOGIC ---
            const pkgJsonPath = path.join(process.cwd(), 'package.json');
            if (!await fs.pathExists(pkgJsonPath)) {
                spinner.fail(chalk.red('Error: package.json not found in your project directory.'));
                await fs.remove(tempPath);
                return;
            }

            console.log(chalk.gray('Reading package.json...'));
            const pkgJson = await fs.readJson(pkgJsonPath);

            // Merge dependencies from module
            mergeDeps(pkgJson, 'dependencies', moduleConfig.dependencies);
            mergeDeps(pkgJson, 'devDependencies', moduleConfig.devDependencies);
            if (moduleConfig.peerDependencies) {
                mergeDeps(pkgJson, 'peerDependencies', moduleConfig.peerDependencies);
            }

            // Write the updated package.json
            console.log(chalk.gray('Writing package.json...'));
            await fs.writeJson(pkgJsonPath, pkgJson, { spaces: 2 });
            console.log(chalk.green('Successfully wrote package.json!'));

            // Debug: print the modified package.json dependencies
            const updatedPkgJson = await fs.readJson(pkgJsonPath);
            console.log(chalk.green('Updated package.json contents:'), {
                dependencies: updatedPkgJson.dependencies,
                devDependencies: updatedPkgJson.devDependencies,
                peerDependencies: updatedPkgJson.peerDependencies,
            });

            // Call npm install to install new dependencies
            console.log(chalk.blue('Running npm install...'));
            // await execa('npm', ['install'], { stdio: 'inherit' });

            // --- END PACKAGE.JSON MERGING LOGIC ---

            // Process files and move them to appropriate directories
            await processModuleFiles(modulePath, process.cwd(), moduleConfig);

            // Update subzero-cli config
            config.installedModules.push(moduleName);
            await fs.writeJson(configPath, config, { spaces: 2 });

            // Clean up temp directory
            await fs.remove(tempPath);

            spinner.succeed(chalk.green(`Module "${moduleName}" added successfully!`));

            if (moduleConfig.description) {
                console.log(chalk.blue(`\n${moduleConfig.description}`));
            }
            if (moduleConfig.postInstall) {
                console.log(chalk.yellow('\nPost-installation notes:'));
                console.log(chalk.gray(moduleConfig.postInstall));
            }
        } catch (error) {
            spinner.fail(`Failed to add module ${moduleName}`);
            throw error;
        }
    } catch (error) {
        console.error(chalk.red('Error adding module:'), error);
        process.exit(1);
    }
}
