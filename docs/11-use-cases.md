# Use Case Examples

This section demonstrates how to build complete applications using SubZero CLI modules. Each example shows the power of configuration-driven development and module reusability.

## Building a Complete CRM System

This example demonstrates how to build a full-featured CRM application using SubZero CLI modules.

### Step 1: Initialize Project
```bash
# Create new CRM project
subzero-cli init my-crm --template=business
cd my-crm

# Install dependencies and setup Supabase
npm install
```

### Step 2: Add Core Modules
```bash
# Add essential modules for CRM
subzero-cli add auth roles tables dashboard forms

# Verify modules are installed
subzero-cli list
```

### Step 3: Configure Database Entities
```bash
# Generate table configurations for CRM entities
subzero-cli config tables --entity=users --generate
subzero-cli config tables --entity=leads --generate
subzero-cli config tables --entity=deals --generate
subzero-cli config tables --entity=companies --generate
subzero-cli config tables --entity=contacts --generate

# Generate role-based permissions
subzero-cli config roles --generate
```

### Step 4: Deploy Database Schema
```bash
# Deploy all database schemas to Supabase
subzero-cli deploy --schemas

# Run initial data seeding
subzero-cli seed --all
```

### Step 5: Customize and Launch
```bash
# Start development server
subzero-cli dev

# Build for production
subzero-cli build
```

**Result**: A fully functional CRM with:
- User authentication and role-based permissions
- Lead management with status tracking
- Deal pipeline management
- Company and contact management
- Dashboard with analytics
- Export/import capabilities

## Building an Inventory Management System

### Modules Used:
- `auth` - User authentication
- `tables` - Product, categories, suppliers tables
- `forms` - Product creation/editing forms
- `dashboard` - Inventory dashboard and reports

### Entity Configurations:
```bash
# Configure inventory entities
subzero-cli config tables --entity=products --generate
subzero-cli config tables --entity=categories --generate
subzero-cli config tables --entity=suppliers --generate
subzero-cli config tables --entity=stock_movements --generate
```

### Products Table Configuration:
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
      "key": "sku",
      "label": "SKU",
      "type": "string",
      "required": true,
      "searchable": true
    },
    {
      "key": "category_id",
      "label": "Category",
      "type": "string",
      "required": true,
      "filterable": true
    },
    {
      "key": "price",
      "label": "Price",
      "type": "number",
      "required": true,
      "sortable": true
    },
    {
      "key": "stock_quantity",
      "label": "Stock",
      "type": "number",
      "required": true,
      "sortable": true
    },
    {
      "key": "reorder_level",
      "label": "Reorder Level",
      "type": "number",
      "required": true
    }
  ],
  "features": {
    "pagination": true,
    "sorting": true,
    "filtering": true,
    "searching": true,
    "export": true,
    "import": true
  },
  "relationships": [
    {
      "type": "belongsTo",
      "entity": "categories",
      "foreignKey": "category_id",
      "displayField": "name"
    }
  ]
}
```

## Building a Project Management Tool

### Modules Used:
- `auth` - Team authentication
- `roles` - Project roles (admin, manager, developer)
- `tables` - Projects, tasks, time tracking
- `dashboard` - Project progress dashboard
- `notifications` - Task assignments and updates

### Key Features Achieved:
- Project creation and management
- Task assignment and tracking
- Time logging
- Team collaboration
- Progress reporting

### Projects Configuration:
```bash
subzero-cli config tables --entity=projects --generate
```

```json
{
  "entity": "projects",
  "tableName": "projects",
  "displayName": "Projects",
  "columns": [
    {
      "key": "name",
      "label": "Project Name",
      "type": "string",
      "required": true,
      "searchable": true
    },
    {
      "key": "description",
      "label": "Description",
      "type": "string",
      "required": false,
      "searchable": true
    },
    {
      "key": "status",
      "label": "Status",
      "type": "string",
      "required": true,
      "filterable": true,
      "options": ["planning", "active", "on-hold", "completed", "cancelled"]
    },
    {
      "key": "start_date",
      "label": "Start Date",
      "type": "date",
      "required": true,
      "sortable": true
    },
    {
      "key": "end_date",
      "label": "End Date",
      "type": "date",
      "required": false,
      "sortable": true
    },
    {
      "key": "manager_id",
      "label": "Project Manager",
      "type": "string",
      "required": true,
      "filterable": true
    }
  ],
  "permissions": {
    "create": ["admin", "manager"],
    "read": ["admin", "manager", "developer"],
    "update": ["admin", "manager"],
    "delete": ["admin"]
  }
}
```

## Building an E-commerce Admin Panel

### Modules Used:
- `auth` - Admin authentication
- `tables` - Products, orders, customers
- `forms` - Product management forms
- `files` - Product image uploads
- `dashboard` - Sales analytics

### Rapid Development Benefits:
- Complete admin panel in hours, not weeks
- Built-in authentication and permissions
- Automatic CRUD operations for all entities
- Export capabilities for reports
- Responsive design out of the box

### Orders Table Configuration:
```json
{
  "entity": "orders",
  "tableName": "orders",
  "displayName": "Orders",
  "columns": [
    {
      "key": "order_number",
      "label": "Order #",
      "type": "string",
      "required": true,
      "searchable": true
    },
    {
      "key": "customer_id",
      "label": "Customer",
      "type": "string",
      "required": true,
      "filterable": true
    },
    {
      "key": "status",
      "label": "Status",
      "type": "string",
      "required": true,
      "filterable": true,
      "options": ["pending", "processing", "shipped", "delivered", "cancelled"]
    },
    {
      "key": "total_amount",
      "label": "Total",
      "type": "number",
      "required": true,
      "sortable": true
    },
    {
      "key": "order_date",
      "label": "Order Date",
      "type": "date",
      "required": true,
      "sortable": true
    }
  ],
  "defaultSort": { "column": "order_date", "direction": "desc" },
  "pageSize": 25
}
```

## Building a Learning Management System (LMS)

### Setup:
```bash
subzero-cli init my-lms --template=education
subzero-cli add auth roles tables forms files dashboard
```

### Entity Configurations:
```bash
subzero-cli config tables --entity=courses --generate
subzero-cli config tables --entity=lessons --generate
subzero-cli config tables --entity=students --generate
subzero-cli config tables --entity=enrollments --generate
```

### Courses Configuration:
```json
{
  "entity": "courses",
  "tableName": "courses",
  "displayName": "Courses",
  "columns": [
    {
      "key": "title",
      "label": "Course Title",
      "type": "string",
      "required": true,
      "searchable": true
    },
    {
      "key": "description",
      "label": "Description",
      "type": "string",
      "required": true,
      "searchable": true
    },
    {
      "key": "instructor_id",
      "label": "Instructor",
      "type": "string",
      "required": true,
      "filterable": true
    },
    {
      "key": "price",
      "label": "Price",
      "type": "number",
      "required": true,
      "sortable": true
    },
    {
      "key": "duration_hours",
      "label": "Duration (Hours)",
      "type": "number",
      "required": true,
      "sortable": true
    },
    {
      "key": "level",
      "label": "Level",
      "type": "string",
      "required": true,
      "filterable": true,
      "options": ["beginner", "intermediate", "advanced"]
    }
  ],
  "permissions": {
    "create": ["admin", "instructor"],
    "read": ["admin", "instructor", "student"],
    "update": ["admin", "instructor"],
    "delete": ["admin"]
  }
}
```

## Module Reusability Examples

### Single Table Module, Multiple Use Cases

The `tables` module can be configured for various entities:

**User Management:**
```json
{
  "entity": "users",
  "displayName": "Team Members",
  "permissions": {
    "create": ["admin"],
    "update": ["admin", "manager"]
  }
}
```

**Product Catalog:**
```json
{
  "entity": "products",
  "displayName": "Product Inventory",
  "features": {
    "import": true,
    "export": true
  }
}
```

**Customer Database:**
```json
{
  "entity": "customers",
  "displayName": "Customer Directory",
  "columns": [
    {"key": "company", "type": "string", "searchable": true},
    {"key": "industry", "type": "string", "filterable": true}
  ]
}
```

Each configuration creates a fully functional CRUD interface with the specified features and permissions, demonstrating the power of configuration-driven development.

## Real Estate Management System

### Setup:
```bash
subzero-cli init real-estate-mgmt
subzero-cli add auth roles tables forms files dashboard
```

### Entities:
- Properties
- Clients (buyers/sellers)
- Agents
- Showings
- Contracts

### Properties Configuration:
```json
{
  "entity": "properties",
  "tableName": "properties",
  "displayName": "Properties",
  "columns": [
    {
      "key": "address",
      "label": "Address",
      "type": "string",
      "required": true,
      "searchable": true
    },
    {
      "key": "property_type",
      "label": "Type",
      "type": "string",
      "required": true,
      "filterable": true,
      "options": ["house", "apartment", "condo", "townhouse", "land"]
    },
    {
      "key": "price",
      "label": "Price",
      "type": "number",
      "required": true,
      "sortable": true
    },
    {
      "key": "bedrooms",
      "label": "Bedrooms",
      "type": "number",
      "required": false,
      "filterable": true
    },
    {
      "key": "bathrooms",
      "label": "Bathrooms",
      "type": "number",
      "required": false,
      "filterable": true
    },
    {
      "key": "square_feet",
      "label": "Square Feet",
      "type": "number",
      "required": false,
      "sortable": true
    },
    {
      "key": "status",
      "label": "Status",
      "type": "string",
      "required": true,
      "filterable": true,
      "options": ["available", "pending", "sold", "withdrawn"]
    },
    {
      "key": "agent_id",
      "label": "Listing Agent",
      "type": "string",
      "required": true,
      "filterable": true
    }
  ],
  "features": {
    "pagination": true,
    "sorting": true,
    "filtering": true,
    "searching": true,
    "export": true
  },
  "permissions": {
    "create": ["admin", "agent"],
    "read": ["admin", "agent"],
    "update": ["admin", "agent"],
    "delete": ["admin"]
  }
}
```

## Healthcare Practice Management

### Setup:
```bash
subzero-cli init healthcare-practice
subzero-cli add auth roles tables forms dashboard
```

### Entities:
- Patients
- Appointments
- Doctors
- Medical Records
- Billing

### Patients Configuration:
```json
{
  "entity": "patients",
  "tableName": "patients",
  "displayName": "Patients",
  "columns": [
    {
      "key": "first_name",
      "label": "First Name",
      "type": "string",
      "required": true,
      "searchable": true
    },
    {
      "key": "last_name",
      "label": "Last Name",
      "type": "string",
      "required": true,
      "searchable": true
    },
    {
      "key": "date_of_birth",
      "label": "Date of Birth",
      "type": "date",
      "required": true,
      "sortable": true
    },
    {
      "key": "phone",
      "label": "Phone",
      "type": "string",
      "required": true,
      "searchable": true
    },
    {
      "key": "email",
      "label": "Email",
      "type": "email",
      "required": false,
      "searchable": true
    },
    {
      "key": "insurance_provider",
      "label": "Insurance Provider",
      "type": "string",
      "required": false,
      "filterable": true
    },
    {
      "key": "primary_doctor_id",
      "label": "Primary Doctor",
      "type": "string",
      "required": false,
      "filterable": true
    }
  ],
  "permissions": {
    "create": ["admin", "nurse", "doctor"],
    "read": ["admin", "nurse", "doctor"],
    "update": ["admin", "nurse", "doctor"],
    "delete": ["admin"]
  }
}
```

Each configuration creates a fully functional CRUD interface with the specified features and permissions, demonstrating the power of configuration-driven development.

---

**Previous**: [← End User Guide](./10-end-user-guide.md) | **Next**: [Contributing →](./12-contributing.md) 