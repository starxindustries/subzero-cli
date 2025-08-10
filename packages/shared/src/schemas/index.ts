import { z } from 'zod';

// Core schemas
export const ProjectTemplateSchema = z.enum(['basic', 'business', 'enterprise']);

export const DatabaseConfigSchema = z.object({
  provider: z.enum(['supabase', 'postgres', 'mysql']),
  url: z.string().url(),
  key: z.string().optional(),
  ssl: z.boolean().optional(),
});

export const ProjectFeaturesSchema = z.object({
  typescript: z.boolean(),
  authentication: z.boolean(),
  roleBasedAccess: z.boolean(),
  fileUpload: z.boolean(),
  realtime: z.boolean().optional(),
  analytics: z.boolean().optional(),
});

export const SubZeroConfigSchema = z.object({
  version: z.string(),
  template: ProjectTemplateSchema,
  modules: z.array(z.string()),
  database: DatabaseConfigSchema,
  features: ProjectFeaturesSchema,
});

// Table module schemas
export const ColumnValidationSchema = z.object({
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  pattern: z.string().optional(),
  message: z.string().optional(),
});

export const SelectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  disabled: z.boolean().optional(),
});

export const TableColumnSchema = z.object({
  key: z.string(),
  label: z.string(),
  type: z.enum(['string', 'number', 'boolean', 'date', 'email', 'url', 'select', 'textarea']),
  required: z.boolean().optional(),
  editable: z.boolean().optional(),
  sortable: z.boolean().optional(),
  searchable: z.boolean().optional(),
  filterable: z.boolean().optional(),
  hidden: z.boolean().optional(),
  validation: ColumnValidationSchema.optional(),
  options: z.array(SelectOptionSchema).optional(),
});

export const TableFeaturesSchema = z.object({
  pagination: z.boolean(),
  sorting: z.boolean(),
  filtering: z.boolean(),
  searching: z.boolean(),
  export: z.boolean(),
  import: z.boolean(),
  bulkActions: z.boolean(),
  columnReorder: z.boolean(),
  columnResize: z.boolean(),
});

export const TablePermissionsSchema = z.object({
  create: z.array(z.string()),
  read: z.array(z.string()),
  update: z.array(z.string()),
  delete: z.array(z.string()),
});

export const TableUIConfigSchema = z.object({
  defaultSort: z.object({
    column: z.string(),
    direction: z.enum(['asc', 'desc']),
  }).optional(),
  pageSize: z.number(),
  pageSizeOptions: z.array(z.number()),
  theme: z.enum(['default', 'compact', 'comfortable']),
  density: z.enum(['compact', 'comfortable', 'spacious']),
});

export const TableActionSchema = z.object({
  name: z.string(),
  label: z.string(),
  type: z.enum(['single', 'bulk']),
  permissions: z.array(z.string()),
  confirmation: z.boolean().optional(),
  icon: z.string().optional(),
});

export const TableConfigSchema = z.object({
  entity: z.string(),
  tableName: z.string(),
  displayName: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
  columns: z.array(TableColumnSchema),
  features: TableFeaturesSchema,
  permissions: TablePermissionsSchema,
  ui: TableUIConfigSchema,
  actions: z.array(TableActionSchema).optional(),
});

// Auth module schemas
export const AuthProviderSchema = z.object({
  name: z.enum(['email', 'google', 'github', 'discord', 'twitter']),
  enabled: z.boolean(),
  config: z.record(z.any()).optional(),
});

export const AuthFeaturesSchema = z.object({
  registration: z.boolean(),
  emailVerification: z.boolean(),
  passwordReset: z.boolean(),
  rememberMe: z.boolean(),
  socialLogin: z.boolean(),
  twoFactor: z.boolean().optional(),
});

export const AuthUIConfigSchema = z.object({
  theme: z.enum(['default', 'modern', 'minimal']),
  logo: z.string().optional(),
  brandName: z.string().optional(),
  customCSS: z.string().optional(),
});

export const AuthSecurityConfigSchema = z.object({
  passwordMinLength: z.number().min(6),
  passwordRequireNumbers: z.boolean(),
  passwordRequireSymbols: z.boolean(),
  passwordRequireUppercase: z.boolean(),
  sessionTimeout: z.number().min(900), // minimum 15 minutes
  maxLoginAttempts: z.number().min(3),
  lockoutDuration: z.number().min(300), // minimum 5 minutes
});

export const AuthConfigSchema = z.object({
  providers: z.array(AuthProviderSchema),
  features: AuthFeaturesSchema,
  ui: AuthUIConfigSchema,
  security: AuthSecurityConfigSchema,
});

// Validation functions
export function validateSubZeroConfig(config: any) {
  return SubZeroConfigSchema.safeParse(config);
}

export function validateTableConfig(config: any) {
  return TableConfigSchema.safeParse(config);
}

export function validateAuthConfig(config: any) {
  return AuthConfigSchema.safeParse(config);
} 