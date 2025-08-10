import chalk from 'chalk';

export class Logger {
  private verbose: boolean = false;

  setVerbose(verbose: boolean) {
    this.verbose = verbose;
  }

  info(message: string, ...args: any[]) {
    console.log(chalk.blue('ℹ'), message, ...args);
  }

  success(message: string, ...args: any[]) {
    console.log(chalk.green('✓'), message, ...args);
  }

  warn(message: string, ...args: any[]) {
    console.log(chalk.yellow('⚠'), message, ...args);
  }

  error(message: string, ...args: any[]) {
    console.error(chalk.red('✗'), message, ...args);
  }

  debug(message: string, ...args: any[]) {
    if (this.verbose) {
      console.log(chalk.gray('🐛'), message, ...args);
    }
  }

  log(message: string, ...args: any[]) {
    console.log(message, ...args);
  }

  newLine() {
    console.log();
  }

  header(title: string) {
    console.log();
    console.log(chalk.bold.cyan(`🚀 ${title}`));
    console.log(chalk.gray('─'.repeat(title.length + 3)));
  }

  step(step: number, total: number, message: string) {
    console.log(chalk.cyan(`[${step}/${total}]`), message);
  }
}

export const logger = new Logger(); 