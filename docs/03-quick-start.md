# Quick Start Guide

Get up and running with SubZero CLI in minutes. This guide will walk you through creating your first application using SubZero's modular architecture.

## Prerequisites

- Node.js 18+
- npm or yarn
- A Supabase account (for database)

## Installation

```bash
# Install SubZero CLI globally
npm install -g @subzero/cli

# Verify installation
subzero-cli --version
```

## Create Your First Project

### 1. Initialize a New Project

```bash
# Create a new CRM project
subzero-cli init my-crm --template=business

# Navigate to your project
cd my-crm

# Install dependencies
npm install
```

This creates a clean Next.js project with SubZero's structure and configurations.

### 2. Add Essential Modules

```bash
# Add core modules for a CRM
subzero-cli add auth roles tables dashboard

# Verify modules are installed
subzero-cli list
```

**Output:**
```
✅ Installed Modules:
- @subzero/auth v1.2.0
- @subzero/roles v1.0.0  
- @subzero/tables v1.1.0
- @subzero/dashboard v1.0.0
```

### 3. Configure Your Database

Set up your Supabase database connection:

```bash
# Configure Supabase connection
subzero-cli config database --interactive
```

This will prompt you for:
- Supabase URL
- Supabase Anon Key
- Database name

### 4. Configure Your Entities

Create table configurations for your CRM entities:

```bash
# Generate configurations for CRM entities
subzero-cli config tables --entity=users --generate
subzero-cli config tables --entity=leads --generate
subzero-cli config tables --entity=deals --generate

# Configure roles and permissions
subzero-cli config roles --generate
```

### 5. Deploy Database Schemas

```bash
# Deploy all database schemas to Supabase
subzero-cli deploy --schemas

# Optional: Seed with sample data
subzero-cli seed --sample
```

### 6. Start Development

```bash
# Start the development server
subzero-cli dev
```

Your application will be available at `http://localhost:3000`

## What You Just Built

In just a few commands, you've created a fully functional CRM with:

### ✅ Authentication System
- Login/signup pages
- Password reset functionality
- Session management
- Protected routes

### ✅ Role-Based Permissions
- Admin, Manager, Agent roles
- Permission-based access control
- User role assignment

### ✅ Data Management
- Users table with full CRUD
- Leads management system
- Deals pipeline tracking
- Export/import capabilities

### ✅ Dashboard
- Analytics and metrics
- Quick access to key data
- Customizable widgets

## Project Structure

Your generated project follows SubZero's standards:

```
my-crm/
├── src/
│   ├── modules/           # Generated module code
│   │   ├── auth/         # Authentication components
│   │   ├── tables/       # Table management
│   │   ├── roles/        # Permission system
│   │   └── dashboard/    # Dashboard widgets
│   └── pages/            # Next.js pages
├── config/
│   ├── modules/          # Module configurations
│   └── subzero.json     # Main configuration
└── package.json
```

## Next Steps

### Customize Your Configuration

Edit the generated configuration files to match your needs:

```bash
# Edit user table configuration
code config/modules/tables-users.json

# Edit role permissions
code config/modules/roles.json

# Edit authentication settings
code config/modules/auth.json
```

### Add More Modules

Expand your application with additional modules:

```bash
# Add form builder for custom forms
subzero-cli add forms

# Add file upload capabilities
subzero-cli add files

# Add notification system
subzero-cli add notifications
```

### Deploy to Production

```bash
# Build for production
subzero-cli build

# Deploy to your hosting platform
npm run deploy
```

## Common Commands

```bash
# Module Management
subzero-cli list                    # List installed modules
subzero-cli add <module>           # Add a module
subzero-cli remove <module>        # Remove a module
subzero-cli update                 # Update all modules

# Configuration
subzero-cli config <module>        # Configure a module
subzero-cli config --validate      # Validate all configurations

# Database
subzero-cli deploy --schemas       # Deploy database schemas
subzero-cli migrate                # Run database migrations
subzero-cli seed --sample          # Seed with sample data

# Development
subzero-cli dev                    # Start development server
subzero-cli build                  # Build for production
subzero-cli doctor                 # Check project health
```

## Example: Adding a Products Module

Let's add product management to your CRM:

```bash
# Configure products table
subzero-cli config tables --entity=products --generate
```

Edit `config/modules/tables-products.json`:

```json
{
  "entity": "products",
  "tableName": "products",
  "displayName": "Products",
  "columns": [
    {
      "key": "name",
      "label": "Product Name",
      "type": "string",
      "required": true,
      "searchable": true
    },
    {
      "key": "price",
      "label": "Price",
      "type": "number",
      "required": true,
      "sortable": true
    },
    {
      "key": "category",
      "label": "Category",
      "type": "string",
      "filterable": true
    }
  ],
  "permissions": {
    "create": ["admin", "manager"],
    "read": ["admin", "manager", "agent"],
    "update": ["admin", "manager"],
    "delete": ["admin"]
  }
}
```

Deploy the new schema:

```bash
# Deploy products table
subzero-cli deploy --schemas

# Restart development server
subzero-cli dev
```

Now you have a products page at `/products` with full CRUD operations!

## Troubleshooting

### Common Issues

**Module installation fails:**
```bash
# Clear cache and retry
npm cache clean --force
subzero-cli add <module> --force
```

**Database connection issues:**
```bash
# Validate your configuration
subzero-cli config database --validate

# Check Supabase credentials
subzero-cli doctor
```

**Build errors:**
```bash
# Check for configuration errors
subzero-cli config --validate-all

# Regenerate module files
subzero-cli regenerate --all
```

## Getting Help

- **Documentation**: Full guides at `/docs`
- **Examples**: Sample projects at `/examples`
- **Community**: GitHub Discussions
- **Issues**: GitHub Issues for bugs

---

**Previous**: [← Project Architecture](./02-architecture.md) | **Next**: [Developer Setup →](./04-developer-setup.md) 