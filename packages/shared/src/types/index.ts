// Core SubZero types
export interface SubZeroConfig {
  version: string;
  template: ProjectTemplate;
  modules: string[];
  database: DatabaseConfig;
  features: ProjectFeatures;
}

export type ProjectTemplate = 'basic' | 'business' | 'enterprise';

export interface DatabaseConfig {
  provider: 'supabase' | 'postgres' | 'mysql';
  url: string;
  key?: string;
  ssl?: boolean;
}

export interface ProjectFeatures {
  typescript: boolean;
  authentication: boolean;
  roleBasedAccess: boolean;
  fileUpload: boolean;
  realtime?: boolean;
  analytics?: boolean;
}

// Module types
export interface ModuleConfig {
  name: string;
  version: string;
  enabled: boolean;
  settings: Record<string, any>;
}

export interface ModuleMetadata {
  name: string;
  version: string;
  description: string;
  dependencies: string[];
  peerDependencies?: string[];
  files: ModuleFile[];
  template?: ModuleTemplate;
  schemas?: string;
}

export interface ModuleFile {
  sourcePath: string;
  type: 'component' | 'page' | 'api' | 'util' | 'type' | 'config';
  destinationPath: string;
}

export interface ModuleTemplate {
  name: string;
  description: string;
  files: string[];
  variables: TemplateVariable[];
}

export interface TemplateVariable {
  name: string;
  type: 'string' | 'boolean' | 'number' | 'select' | 'array';
  required: boolean;
  default?: any;
  options?: string[];
  description?: string;
}

// Database schema types
export interface DatabaseSchema {
  tableName: string;
  columns: ColumnDefinition[];
  indexes?: IndexDefinition[];
  constraints?: ConstraintDefinition[];
  relationships?: RelationshipDefinition[];
}

export interface ColumnDefinition {
  name: string;
  type: string;
  nullable?: boolean;
  default?: any;
  primaryKey?: boolean;
  unique?: boolean;
  autoIncrement?: boolean;
}

export interface IndexDefinition {
  name: string;
  columns: string[];
  unique?: boolean;
  type?: 'btree' | 'hash' | 'gin' | 'gist';
}

export interface ConstraintDefinition {
  name: string;
  type: 'check' | 'foreign_key' | 'unique' | 'primary_key';
  definition: string;
}

export interface RelationshipDefinition {
  name: string;
  type: 'one_to_one' | 'one_to_many' | 'many_to_many';
  table: string;
  foreignKey: string;
  references: string;
  onDelete?: 'cascade' | 'restrict' | 'set_null';
  onUpdate?: 'cascade' | 'restrict' | 'set_null';
}

// Table module specific types
export interface TableConfig {
  entity: string;
  tableName: string;
  displayName: string;
  description?: string;
  icon?: string;
  columns: TableColumn[];
  features: TableFeatures;
  permissions: TablePermissions;
  ui: TableUIConfig;
  actions?: TableAction[];
}

export interface TableColumn {
  key: string;
  label: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'email' | 'url' | 'select' | 'textarea';
  required?: boolean;
  editable?: boolean;
  sortable?: boolean;
  searchable?: boolean;
  filterable?: boolean;
  hidden?: boolean;
  validation?: ColumnValidation;
  options?: SelectOption[];
}

export interface ColumnValidation {
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  message?: string;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface TableFeatures {
  pagination: boolean;
  sorting: boolean;
  filtering: boolean;
  searching: boolean;
  export: boolean;
  import: boolean;
  bulkActions: boolean;
  columnReorder: boolean;
  columnResize: boolean;
}

export interface TablePermissions {
  create: string[];
  read: string[];
  update: string[];
  delete: string[];
}

export interface TableUIConfig {
  defaultSort?: {
    column: string;
    direction: 'asc' | 'desc';
  };
  pageSize: number;
  pageSizeOptions: number[];
  theme: 'default' | 'compact' | 'comfortable';
  density: 'compact' | 'comfortable' | 'spacious';
}

export interface TableAction {
  name: string;
  label: string;
  type: 'single' | 'bulk';
  permissions: string[];
  confirmation?: boolean;
  icon?: string;
}

// Auth module types
export interface AuthConfig {
  providers: AuthProvider[];
  features: AuthFeatures;
  ui: AuthUIConfig;
  security: AuthSecurityConfig;
}

export interface AuthProvider {
  name: 'email' | 'google' | 'github' | 'discord' | 'twitter';
  enabled: boolean;
  config?: Record<string, any>;
}

export interface AuthFeatures {
  registration: boolean;
  emailVerification: boolean;
  passwordReset: boolean;
  rememberMe: boolean;
  socialLogin: boolean;
  twoFactor?: boolean;
}

export interface AuthUIConfig {
  theme: 'default' | 'modern' | 'minimal';
  logo?: string;
  brandName?: string;
  customCSS?: string;
}

export interface AuthSecurityConfig {
  passwordMinLength: number;
  passwordRequireNumbers: boolean;
  passwordRequireSymbols: boolean;
  passwordRequireUppercase: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  lockoutDuration: number;
} 