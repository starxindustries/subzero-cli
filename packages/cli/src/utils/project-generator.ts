import fs from 'fs-extra';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

import { logger } from './logger';

const execAsync = promisify(exec);

export type ProjectTemplate = 'basic' | 'business' | 'enterprise';

export interface ProjectConfig {
  name: string;
  targetDir: string;
  template: ProjectTemplate;
  installDependencies?: boolean;
  initGit?: boolean;
}

export async function createProject(config: ProjectConfig): Promise<void> {
  const { name, targetDir, template, installDependencies = true, initGit = true } = config;

  // Copy skeleton files to target directory
  await copySkeletonFiles(targetDir, name, template);

  // Initialize git repository
  if (initGit) {
    await initializeGit(targetDir);
  }

  // Install dependencies
  if (installDependencies) {
    await installProjectDependencies(targetDir);
  }
}

async function copySkeletonFiles(targetDir: string, projectName: string, template: ProjectTemplate): Promise<void> {
  try {
    // Get the skeleton directory path (relative to this file)
    const skeletonDir = path.resolve(__dirname, '../../../skeleton');

    // Check if skeleton directory exists
    if (!(await fs.pathExists(skeletonDir))) {
      throw new Error(`Skeleton directory not found at: ${skeletonDir}`);
    }

    logger.info(`Copying skeleton files from: ${skeletonDir}`);
    logger.info(`To target directory: ${targetDir}`);

    // Copy all files from skeleton to target directory
    await fs.copy(skeletonDir, targetDir, {
      overwrite: true,
      filter: (src: string, dest: string) => {
        // Skip node_modules, .next, and other build artifacts
        const relativePath = path.relative(skeletonDir, src);
        const shouldSkip = relativePath.includes('node_modules') ||
          relativePath.includes('.next') ||
          relativePath.includes('dist') ||
          relativePath.includes('.git');
        return !shouldSkip;
      }
    });

    // Update package.json with the correct project name
    await updatePackageJson(targetDir, projectName);

    // Create SubZero configuration
    await createSubZeroConfig(targetDir, projectName, template);

    logger.info('✅ Skeleton files copied successfully!');

  } catch (error) {
    logger.error('Failed to copy skeleton files:', error);
    throw error;
  }
}

async function updatePackageJson(targetDir: string, projectName: string): Promise<void> {
  const packageJsonPath = path.join(targetDir, 'package.json');

  if (await fs.pathExists(packageJsonPath)) {
    const packageJson = await fs.readJson(packageJsonPath);
    packageJson.name = projectName;
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    logger.info(`📦 Updated package.json with project name: ${projectName}`);
  }
}

async function createSubZeroConfig(targetDir: string, projectName: string, template: ProjectTemplate): Promise<void> {
  // Ensure config directory exists
  const configDir = path.join(targetDir, 'config');
  await fs.ensureDir(configDir);

  // Generate SubZero configuration
  const subzeroConfig = {
    version: '0.1.0',
    name: projectName,
    template,
    modules: [],
    database: {
      provider: 'supabase',
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    },
    features: {
      typescript: true,
      authentication: template !== 'basic',
      roleBasedAccess: template === 'business' || template === 'enterprise',
      fileUpload: template === 'enterprise'
    }
  };

  const configPath = path.join(configDir, 'subzero.json');
  await fs.writeJson(configPath, subzeroConfig, { spaces: 2 });
  logger.info('⚙️ Created SubZero configuration file');
}

async function initializeGit(targetDir: string): Promise<void> {
  try {
    await execAsync('git init', { cwd: targetDir });
    await execAsync('git add .', { cwd: targetDir });
    await execAsync('git commit -m "Initial commit from SubZero CLI"', { cwd: targetDir });
    logger.debug('Git repository initialized');
  } catch (error) {
    logger.warn('Failed to initialize git repository:', error);
  }
}

async function installProjectDependencies(targetDir: string): Promise<void> {
  try {
    logger.info('Installing dependencies...');
    await execAsync('npm install', { cwd: targetDir });
    logger.success('Dependencies installed successfully');
  } catch (error) {
    logger.warn('Failed to install dependencies:', error);
    logger.info('You can run "npm install" manually');
  }
} 