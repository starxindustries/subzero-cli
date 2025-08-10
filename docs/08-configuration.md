# Configuration Guide

SubZero CLI uses a hierarchical configuration system that allows for flexible, maintainable, and environment-specific customization of modules and applications.

## Configuration Hierarchy

SubZero follows a strict configuration hierarchy that determines how settings are resolved:

1. **Command line arguments** (highest priority)
2. **Environment variables**
3. **Module-specific configuration files**
4. **Project configuration file** (`subzero.json`)
5. **Module defaults** (lowest priority)

## Main Configuration File

### subzero.json Structure

The main configuration file defines project-wide settings and module configurations:

```json
{
  "version": "1.0.0",
  "project": {
    "name": "my-crm",
    "description": "Customer Relationship Management System",
    "typescript": true,
    "tailwind": true,
    "database": {
      "provider": "supabase",
      "url": "https://your-project.supabase.co",
      "anonKey": "your-anon-key"
    }
  },
  "modules": {
    "auth": {
      "enabled": true,
      "version": "^1.2.0",
      "config": "./config/modules/auth.json"
    },
    "roles": {
      "enabled": true,
      "version": "^1.0.0",
      "config": "./config/modules/roles.json"
    },
    "tables": {
      "enabled": true,
      "version": "^1.1.0",
      "entities": [
        "./config/modules/tables-users.json",
        "./config/modules/tables-leads.json",
        "./config/modules/tables-deals.json"
      ]
    }
  },
  "environments": {
    "development": "./config/environments/development.json",
    "staging": "./config/environments/staging.json",
    "production": "./config/environments/production.json"
  }
}
```

## Module-Specific Configurations

### Authentication Module (auth.json)

```json
{
  "provider": "supabase",
  "pages": {
    "login": "/auth/login",
    "signup": "/auth/signup",
    "forgotPassword": "/auth/forgot-password",
    "resetPassword": "/auth/reset-password"
  },
  "redirects": {
    "afterLogin": "/dashboard",
    "afterLogout": "/",
    "afterSignup": "/welcome"
  },
  "features": {
    "socialLogin": true,
    "emailVerification": true,
    "passwordReset": true,
    "rememberMe": true,
    "twoFactorAuth": false
  },
  "socialProviders": ["google", "github"],
  "sessionDuration": "7d",
  "passwordPolicy": {
    "minLength": 8,
    "requireUppercase": true,
    "requireNumbers": true,
    "requireSpecialChars": true
  },
  "rateLimit": {
    "login": "5/min",
    "signup": "3/min",
    "passwordReset": "2/min"
  }
}
```

### Roles Module (roles.json)

```json
{
  "roles": [
    {
      "name": "admin",
      "displayName": "Administrator",
      "description": "Full system access",
      "permissions": ["*"],
      "color": "#dc2626"
    },
    {
      "name": "manager",
      "displayName": "Sales Manager",
      "description": "Manage team and leads",
      "permissions": [
        "users:read",
        "leads:*",
        "deals:*",
        "reports:read"
      ],
      "color": "#2563eb"
    },
    {
      "name": "agent",
      "displayName": "Sales Agent",
      "description": "Handle leads and deals",
      "permissions": [
        "leads:read",
        "leads:update",
        "deals:read",
        "deals:create",
        "deals:update"
      ],
      "color": "#059669"
    }
  ],
  "defaultRole": "agent",
  "inheritanceEnabled": true,
  "autoAssignment": {
    "enabled": true,
    "rules": [
      {
        "condition": "email.endsWith('@company.com')",
        "role": "agent"
      }
    ]
  }
}
```

### Tables Module Configuration

#### Generic Table Configuration (tables-users.json)

```json
{
  "entity": "users",
  "tableName": "users",
  "displayName": "Users",
  "description": "System users and team members",
  "icon": "users",
  "columns": [
    {
      "key": "id",
      "label": "ID",
      "type": "string",
      "required": true,
      "editable": false,
      "sortable": true,
      "searchable": false,
      "hidden": true
    },
    {
      "key": "email",
      "label": "Email",
      "type": "email",
      "required": true,
      "editable": true,
      "sortable": true,
      "searchable": true,
      "filterable": true,
      "validation": {
        "pattern": "^[^@]+@[^@]+\\.[^@]+$",
        "message": "Please enter a valid email address"
      }
    },
    {
      "key": "first_name",
      "label": "First Name",
      "type": "string",
      "required": true,
      "editable": true,
      "sortable": true,
      "searchable": true,
      "validation": {
        "minLength": 2,
        "maxLength": 50
      }
    },
    {
      "key": "role",
      "label": "Role",
      "type": "select",
      "required": true,
      "editable": true,
      "sortable": true,
      "filterable": true,
      "options": [
        {"value": "admin", "label": "Administrator"},
        {"value": "manager", "label": "Manager"},
        {"value": "agent", "label": "Agent"}
      ]
    }
  ],
  "features": {
    "pagination": true,
    "sorting": true,
    "filtering": true,
    "searching": true,
    "export": true,
    "import": false,
    "bulkActions": true,
    "columnReorder": true,
    "columnResize": true
  },
  "permissions": {
    "create": ["admin", "manager"],
    "read": ["admin", "manager", "agent"],
    "update": ["admin", "manager"],
    "delete": ["admin"]
  },
  "ui": {
    "defaultSort": { "column": "created_at", "direction": "desc" },
    "pageSize": 25,
    "pageSizeOptions": [10, 25, 50, 100],
    "theme": "default",
    "density": "comfortable"
  },
  "actions": [
    {
      "name": "activate",
      "label": "Activate User",
      "type": "single",
      "permissions": ["admin", "manager"],
      "confirmation": true
    },
    {
      "name": "deactivate",
      "label": "Deactivate User",
      "type": "single",
      "permissions": ["admin", "manager"],
      "confirmation": true
    }
  ]
}
```

## Environment-Specific Configuration

### Development Configuration (development.json)

```json
{
  "database": {
    "url": "https://dev-project.supabase.co",
    "anonKey": "dev-anon-key"
  },
  "auth": {
    "features": {
      "emailVerification": false,
      "twoFactorAuth": false
    }
  },
  "logging": {
    "level": "debug",
    "enabled": true
  },
  "features": {
    "seedData": true,
    "debugMode": true
  }
}
```

### Production Configuration (production.json)

```json
{
  "database": {
    "url": "${SUPABASE_URL}",
    "anonKey": "${SUPABASE_ANON_KEY}"
  },
  "auth": {
    "features": {
      "emailVerification": true,
      "twoFactorAuth": true
    },
    "rateLimit": {
      "login": "3/min",
      "signup": "2/min"
    }
  },
  "logging": {
    "level": "error",
    "enabled": true
  },
  "features": {
    "seedData": false,
    "debugMode": false
  }
}
```

## Configuration Schema Validation

SubZero validates all configuration files against JSON schemas to ensure correctness:

### Module Configuration Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "entity": {
      "type": "string",
      "pattern": "^[a-z_]+$",
      "description": "Entity name (lowercase, underscore separated)"
    },
    "tableName": {
      "type": "string",
      "description": "Database table name"
    },
    "displayName": {
      "type": "string",
      "description": "Human-readable entity name"
    },
    "columns": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/column"
      }
    }
  },
  "definitions": {
    "column": {
      "type": "object",
      "properties": {
        "key": { "type": "string" },
        "label": { "type": "string" },
        "type": { 
          "type": "string",
          "enum": ["string", "number", "boolean", "date", "email", "url", "select"]
        },
        "required": { "type": "boolean", "default": false },
        "editable": { "type": "boolean", "default": true },
        "validation": {
          "type": "object",
          "properties": {
            "minLength": { "type": "number" },
            "maxLength": { "type": "number" },
            "pattern": { "type": "string" },
            "message": { "type": "string" }
          }
        }
      },
      "required": ["key", "label", "type"]
    }
  }
}
```

## Configuration Commands

### Generate Configuration

```bash
# Generate configuration with interactive prompts
subzero-cli config tables --entity=products --interactive

# Generate from template
subzero-cli config tables --entity=products --template=ecommerce

# Generate with defaults
subzero-cli config tables --entity=products --generate
```

### Validate Configuration

```bash
# Validate specific configuration
subzero-cli config tables-users --validate

# Validate all configurations
subzero-cli config --validate-all

# Check for schema compliance
subzero-cli config --check-schema
```

### Configuration Management

```bash
# View current configuration
subzero-cli config tables-users --show

# Edit configuration
subzero-cli config tables-users --edit

# Reset to defaults
subzero-cli config tables-users --reset

# Copy configuration
subzero-cli config tables-users --copy-to=tables-customers
```

## Advanced Configuration Features

### Environment Variables

Use environment variables in configuration files:

```json
{
  "database": {
    "url": "${SUPABASE_URL}",
    "anonKey": "${SUPABASE_ANON_KEY}"
  },
  "auth": {
    "jwtSecret": "${JWT_SECRET}"
  }
}
```

### Configuration Inheritance

Configurations can inherit from base configurations:

```json
{
  "extends": "./base-table.json",
  "entity": "products",
  "columns": [
    // Additional columns specific to products
  ]
}
```

### Conditional Configuration

Apply configurations based on conditions:

```json
{
  "conditions": [
    {
      "if": "env === 'development'",
      "then": {
        "features": {
          "debugMode": true
        }
      }
    }
  ]
}
```

## Configuration Best Practices

### 1. Use Environment-Specific Configurations
- Keep sensitive data in environment variables
- Use different configurations for dev/staging/production
- Never commit secrets to version control

### 2. Modular Configuration
- Break large configurations into smaller, focused files
- Use inheritance to avoid duplication
- Group related settings together

### 3. Validation and Documentation
- Always validate configurations before deployment
- Document configuration options and their effects
- Use meaningful names and descriptions

### 4. Version Control
- Version your configuration files
- Use meaningful commit messages for config changes
- Review configuration changes carefully

### 5. Testing Configurations
- Test configurations in development environment first
- Use dry-run options when available
- Have rollback plans for configuration changes

## Configuration Migration

When upgrading SubZero versions, use migration tools:

```bash
# Check for configuration updates needed
subzero-cli migrate --check

# Migrate configurations to new version
subzero-cli migrate --config

# Preview migration changes
subzero-cli migrate --config --dry-run
```

---

**Previous**: [← Project Structure Standards](./07-project-standards.md) | **Next**: [Publishing & Release →](./09-publishing.md) 