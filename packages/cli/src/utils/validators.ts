import semver from 'semver';
import { logger } from './logger';

export function validateNodeVersion(): void {
  const requiredVersion = '18.0.0';
  const currentVersion = process.version;

  if (!semver.gte(currentVersion, requiredVersion)) {
    logger.error(`Node.js ${requiredVersion} or higher is required.`);
    logger.error(`Current version: ${currentVersion}`);
    process.exit(1);
  }
}

export function validateProjectName(name: string): boolean {
  // Check for valid npm package name patterns
  const validPattern = /^[a-z0-9]([a-z0-9\-_])*$/;
  return validPattern.test(name) && name.length > 0 && name.length <= 214;
}

export function validateModuleName(name: string): boolean {
  const validModules = [
    'auth',
    'roles', 
    'tables',
    'forms',
    'dashboard',
    'files',
    'notifications',
    'bridge'
  ];
  return validModules.includes(name);
}

export function validateTemplate(template: string): boolean {
  const validTemplates = ['basic', 'business', 'enterprise'];
  return validTemplates.includes(template);
} 