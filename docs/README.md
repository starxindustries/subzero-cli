# SubZero CLI Documentation

A modular CLI library for Next.js applications that enables rapid application development through standalone, config-driven modules. Build complete applications like CRMs, dashboards, and business tools by simply adding pre-built modules and configuring them for your specific use cases.

## Quick Start

```bash
# Install globally
npm install -g @subzero/cli

# Initialize new project
subzero-cli init my-crm --template=business

# Add modules
subzero-cli add auth roles tables dashboard

# Start building!
subzero-cli dev
```

## Documentation Index

### Getting Started
- 📚 [Overview & Core Philosophy](./01-overview.md) - Understanding SubZero's approach to rapid development
- 🏗️ [Project Architecture](./02-architecture.md) - Monorepo structure and module composition
- ⚡ [Quick Start Guide](./03-quick-start.md) - Get up and running in minutes

### Development
- 🔧 [Developer Setup](./04-developer-setup.md) - Setting up the development environment
- 🔄 [Development Workflow](./05-development-workflow.md) - Daily development commands and practices
- 📦 [Module Development](./06-module-development.md) - Creating new modules and components

### Standards & Best Practices
- 📋 [Project Structure Standards](./07-project-standards.md) - Strict placement rules and conventions
- 🎯 [Configuration Guide](./08-configuration.md) - Module configuration and customization
- 🚀 [Publishing & Release](./09-publishing.md) - Release process and versioning

### Usage & Examples
- 👨‍💻 [End User Guide](./10-end-user-guide.md) - Using SubZero CLI to build applications
- 💼 [Use Case Examples](./11-use-cases.md) - Real-world examples (CRM, inventory, etc.)
- 🤝 [Contributing](./12-contributing.md) - How to contribute to the project

## Key Features

- **Config-Driven Customization**: One module, multiple use cases through configuration
- **Database Schema Management**: Automatic Supabase schema deployment
- **Modular Architecture**: Standalone modules with zero interference
- **Bridge System**: Future capability for controlled inter-module communication
- **TypeScript Support**: Full type safety across modules
- **Standard Project Structure**: Clean, maintainable, and scalable organization

## Real-World Example: Building a CRM

```bash
# Initialize CRM project
subzero-cli init my-crm --template=business

# Add essential modules
subzero-cli add auth roles tables forms dashboard

# Configure table module for different entities
subzero-cli config tables --entity=users --generate
subzero-cli config tables --entity=leads --generate
subzero-cli config tables --entity=deals --generate

# Deploy database schemas
subzero-cli deploy --schemas
```

**Result**: A fully functional CRM with user management, role-based permissions, and configured tables for users, leads, and deals - ready in minutes!

## Support and Community

- **GitHub Issues**: Report bugs and request features
- **Discussions**: Ask questions and share ideas
- **Documentation**: Comprehensive guides and API reference
- **Examples**: Sample projects and use cases

---

## License

MIT License - see LICENSE file for details.

## Changelog

See CHANGELOG.md for detailed release notes and migration guides. 