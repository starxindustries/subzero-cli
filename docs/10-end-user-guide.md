# End User Guide

This guide is for developers who want to use SubZero CLI to build applications quickly. It covers installation, project creation, module management, and common workflows.

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- A Supabase account (for database)

### Install SubZero CLI

```bash
# Install globally
npm install -g @subzero/cli

# Verify installation
subzero-cli --version

# Check available commands
subzero-cli --help
```

## Creating a New Project

### Initialize Project

```bash
# Basic initialization
subzero-cli init my-app

# Initialize with template
subzero-cli init my-crm --template=business
subzero-cli init my-blog --template=content
subzero-cli init my-shop --template=ecommerce

# Initialize with TypeScript
subzero-cli init my-app --typescript

# Initialize with specific framework version
subzero-cli init my-app --next-version=13
```

### Available Templates

- **`business`** - CRM, project management, business tools
- **`content`** - Blogs, documentation, content management
- **`ecommerce`** - Online stores, product catalogs
- **`education`** - Learning management, course platforms
- **`healthcare`** - Patient management, practice tools

## Module Management

### Adding Modules

```bash
# Add single module
subzero-cli add auth

# Add multiple modules
subzero-cli add auth roles tables

# Add module with specific version
subzero-cli add auth@1.2.0

# Add module with configuration
subzero-cli add auth --config=./my-auth-config.json

# Force reinstall
subzero-cli add auth --force
```

### Listing Modules

```bash
# List installed modules
subzero-cli list

# List available modules
subzero-cli list --available

# List modules with details
subzero-cli list --detailed

# List outdated modules
subzero-cli list --outdated
```

### Removing Modules

```bash
# Remove single module
subzero-cli remove auth

# Remove multiple modules
subzero-cli remove auth roles

# Remove with cleanup
subzero-cli remove auth --cleanup

# Remove but keep configuration
subzero-cli remove auth --keep-config
```

### Updating Modules

```bash
# Update all modules
subzero-cli update

# Update specific module
subzero-cli update auth

# Update to specific version
subzero-cli update auth@1.3.0

# Update with preview
subzero-cli update --dry-run
```

## Configuration Management

### Generate Configuration

```bash
# Generate with interactive prompts
subzero-cli config auth --interactive

# Generate from template
subzero-cli config tables --entity=users --template=crm

# Generate with defaults
subzero-cli config tables --entity=leads --generate

# Generate for specific environment
subzero-cli config auth --env=production --generate
```

### Validate Configuration

```bash
# Validate specific module configuration
subzero-cli config auth --validate

# Validate all configurations
subzero-cli config --validate-all

# Check schema compliance
subzero-cli config --check-schema

# Validate for specific environment
subzero-cli config --validate --env=production
```

### Edit Configuration

```bash
# Open configuration in default editor
subzero-cli config auth --edit

# View current configuration
subzero-cli config auth --show

# Copy configuration
subzero-cli config tables-users --copy-to=tables-customers

# Reset to defaults
subzero-cli config auth --reset
```

## Database Management

### Deploy Schemas

```bash
# Deploy all schemas
subzero-cli deploy --schemas

# Deploy specific module schemas
subzero-cli deploy --schemas --module=tables

# Deploy with preview
subzero-cli deploy --schemas --dry-run

# Deploy to specific environment
subzero-cli deploy --schemas --env=staging
```

### Run Migrations

```bash
# Run all pending migrations
subzero-cli migrate

# Run specific migration
subzero-cli migrate 003_add_roles

# Rollback last migration
subzero-cli migrate --rollback

# Preview migration changes
subzero-cli migrate --dry-run
```

### Seed Data

```bash
# Seed with sample data
subzero-cli seed --sample

# Seed specific entities
subzero-cli seed --entities=users,roles

# Seed from file
subzero-cli seed --file=./my-seed-data.sql

# Clear all data
subzero-cli seed --clear
```

## Development Commands

### Development Server

```bash
# Start development server
subzero-cli dev

# Start with specific port
subzero-cli dev --port=4000

# Start with environment
subzero-cli dev --env=staging

# Start with debug mode
subzero-cli dev --debug
```

### Build Project

```bash
# Build for production
subzero-cli build

# Build with environment
subzero-cli build --env=production

# Build with analysis
subzero-cli build --analyze

# Build specific modules only
subzero-cli build --modules=auth,tables
```

### Project Health Check

```bash
# Check project health
subzero-cli doctor

# Check specific aspects
subzero-cli doctor --config
subzero-cli doctor --database
subzero-cli doctor --modules

# Check with fixes
subzero-cli doctor --fix
```

## Working with Entities

### Creating Entity Tables

```bash
# Create new entity configuration
subzero-cli config tables --entity=products --generate

# Create with specific columns
subzero-cli config tables --entity=products --columns=name,price,category

# Create from existing table
subzero-cli config tables --entity=products --from-table=products

# Create with template
subzero-cli config tables --entity=products --template=inventory
```

### Managing Entity Data

```bash
# Import data for entity
subzero-cli import --entity=products --file=products.csv

# Export entity data
subzero-cli export --entity=products --format=csv

# Backup entity
subzero-cli backup --entity=products

# Restore entity
subzero-cli restore --entity=products --file=backup.sql
```

## Environment Management

### Set Environment

```bash
# Set current environment
subzero-cli env set development

# Show current environment
subzero-cli env show

# List available environments
subzero-cli env list

# Create new environment
subzero-cli env create staging
```

### Environment Variables

```bash
# Set environment variable
subzero-cli env set-var SUPABASE_URL https://your-project.supabase.co

# Get environment variable
subzero-cli env get-var SUPABASE_URL

# List all environment variables
subzero-cli env vars

# Load from .env file
subzero-cli env load .env.production
```

## Common Workflows

### Setting up a CRM

```bash
# 1. Initialize project
subzero-cli init my-crm --template=business
cd my-crm

# 2. Add required modules
subzero-cli add auth roles tables dashboard

# 3. Configure entities
subzero-cli config tables --entity=users --generate
subzero-cli config tables --entity=leads --generate
subzero-cli config tables --entity=deals --generate

# 4. Configure roles
subzero-cli config roles --generate

# 5. Deploy to database
subzero-cli deploy --schemas

# 6. Start development
subzero-cli dev
```

### Adding Authentication

```bash
# 1. Add auth module
subzero-cli add auth

# 2. Configure authentication
subzero-cli config auth --interactive

# 3. Deploy auth schemas
subzero-cli deploy --schemas --module=auth

# 4. Test authentication
subzero-cli dev
```

### Creating Custom Entity

```bash
# 1. Generate entity configuration
subzero-cli config tables --entity=inventory --interactive

# 2. Edit configuration as needed
subzero-cli config tables-inventory --edit

# 3. Deploy entity schema
subzero-cli deploy --schemas

# 4. Seed with sample data
subzero-cli seed --entities=inventory --sample
```

## Troubleshooting

### Common Issues

**Module installation fails:**
```bash
# Clear npm cache
npm cache clean --force

# Reinstall with force
subzero-cli add auth --force

# Check network connectivity
subzero-cli doctor --network
```

**Configuration validation errors:**
```bash
# Validate configuration
subzero-cli config --validate-all

# Check specific configuration
subzero-cli config tables-users --validate

# Reset to defaults
subzero-cli config tables-users --reset
```

**Database connection issues:**
```bash
# Check database configuration
subzero-cli doctor --database

# Test connection
subzero-cli db test-connection

# Validate credentials
subzero-cli config database --validate
```

**Build errors:**
```bash
# Check for errors
subzero-cli doctor

# Clean build cache
subzero-cli clean

# Rebuild with debug
subzero-cli build --debug
```

### Getting Help

```bash
# Get help for specific command
subzero-cli help add
subzero-cli add --help

# Show version information
subzero-cli --version

# Show detailed project info
subzero-cli info

# Check project health
subzero-cli doctor
```

## Tips and Best Practices

### 1. Start Small
- Begin with basic modules (auth, tables)
- Add complexity gradually
- Test each module before adding the next

### 2. Use Templates
- Leverage built-in templates for common use cases
- Create custom templates for repeated patterns
- Share templates across projects

### 3. Environment Management
- Use different configurations for different environments
- Keep sensitive data in environment variables
- Test in development before deploying to production

### 4. Regular Maintenance
- Keep modules updated
- Run health checks regularly
- Monitor for security updates

### 5. Configuration Management
- Version control your configurations
- Use meaningful names for entities and fields
- Document custom configurations

### 6. Performance Optimization
- Use appropriate page sizes for tables
- Index frequently queried columns
- Monitor database performance

---

**Previous**: [← Publishing & Release](./09-publishing.md) | **Next**: [Use Case Examples →](./11-use-cases.md) 