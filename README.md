# SubZero CLI

🚀 **Rapid modular application development for Next.js**

SubZero CLI is a powerful, modular CLI tool that enables rapid application development by providing pre-built, configurable modules for common application features. Build CRM systems, admin panels, and business applications in minutes, not days.

## ✨ Features

- 🧩 **Modular Architecture** - Add only what you need
- ⚡ **Rapid Development** - Go from idea to working app in minutes
- 🎛️ **Configuration-Driven** - Customize modules with JSON configs
- 🏗️ **TypeScript First** - Full type safety across all modules
- 📊 **Supabase Integration** - Automatic database schema deployment
- 🎨 **Modern UI** - Beautiful, responsive components out of the box
- 🔒 **Security Built-in** - Auth, roles, and permissions ready to go

## 🚀 Quick Start

```bash
# Install globally
npm install -g @subzero/cli

# Initialize new project
subzero-cli init my-crm --template=business

# Add modules
subzero-cli add auth roles tables dashboard

# Configure your entities
subzero-cli config tables --entity=users --generate

# Deploy to database
subzero-cli deploy --schemas

# Start building!
subzero-cli dev
```

## 📦 Available Modules

| Module | Description | Status |
|--------|-------------|--------|
| `@subzero/auth` | Authentication & user management | ✅ Ready |
| `@subzero/roles` | Role-based access control | ✅ Ready |
| `@subzero/tables` | Data tables with CRUD operations | ✅ Ready |
| `@subzero/forms` | Dynamic form generation | ✅ Ready |
| `@subzero/dashboard` | Analytics and dashboard widgets | ✅ Ready |
| `@subzero/files` | File upload and management | 🚧 Coming Soon |
| `@subzero/notifications` | Real-time notifications | 🚧 Coming Soon |
| `@subzero/bridge` | Inter-module communication | 🔮 Future |

## 🏗️ Use Cases

SubZero CLI is perfect for building:

- **CRM Systems** - Customer relationship management
- **Admin Panels** - Backend administration interfaces
- **Inventory Management** - Stock and product management
- **Project Management** - Team collaboration tools
- **E-commerce Admin** - Online store management
- **Learning Management** - Educational platforms

## 📖 Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) directory:

- [📋 Overview](./docs/01-overview.md) - Core philosophy and approach
- [🏗️ Architecture](./docs/02-architecture.md) - System design and structure
- [🚀 Quick Start](./docs/03-quick-start.md) - Get started in minutes
- [👥 End User Guide](./docs/10-end-user-guide.md) - Complete CLI reference
- [🎛️ Configuration](./docs/08-configuration.md) - Module configuration guide
- [📐 Project Standards](./docs/07-project-standards.md) - Code organization rules
- [💡 Use Cases](./docs/11-use-cases.md) - Real-world examples

## 🧪 Development

This is a monorepo managed with [Turborepo](https://turbo.build/).

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Run development
npm run dev

# Run tests
npm run test

# Lint code
npm run lint
```

### Package Structure

```
packages/
├── cli/              # Main CLI package
├── shared/           # Shared utilities and types
└── modules/          # Individual modules
    ├── auth/
    ├── roles/
    ├── tables/
    ├── forms/
    ├── dashboard/
    ├── files/
    ├── notifications/
    └── bridge/
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/12-contributing.md) for details.

## 📄 License

MIT © SubZero Team

## 🆘 Support

- 📖 [Documentation](./docs/)
- 🐛 [Issue Tracker](https://github.com/subzero-cli/subzero/issues)
- 💬 [Discussions](https://github.com/subzero-cli/subzero/discussions)
- 📧 Email: support@subzero-cli.dev

---

**Built with ❤️ for developers who value speed and quality.** 