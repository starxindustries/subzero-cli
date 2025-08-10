import { ModuleMetadata } from '@subzero/shared';

export const authModuleMetadata: ModuleMetadata = {
  name: 'auth',
  version: '0.1.0',
  description: 'Authentication and user management module with Supabase integration',
  dependencies: [
    '@supabase/supabase-js',
    '@supabase/auth-helpers-nextjs',
    '@supabase/auth-helpers-react',
    'zustand'
  ],
  files: [
    // Pages - Auth
    {
      sourcePath: 'src/pages/modules/auth-module/auth/error/page.tsx',
      destinationPath: 'src/app/auth/error/page.tsx',
      type: 'page'
    },
    {
      sourcePath: 'src/pages/modules/auth-module/auth/forgot-password/page.tsx',
      destinationPath: 'src/app/auth/forgot-password/page.tsx',
      type: 'page'
    },
    {
      sourcePath: 'src/pages/modules/auth-module/auth/login/page.tsx',
      destinationPath: 'src/app/auth/login/page.tsx',
      type: 'page'
    },
    {
      sourcePath: 'src/pages/modules/auth-module/auth/sign-up/page.tsx',
      destinationPath: 'src/app/auth/sign-up/page.tsx',
      type: 'page'
    },
    {
      sourcePath: 'src/pages/modules/auth-module/auth/sign-up-success/page.tsx',
      destinationPath: 'src/app/auth/sign-up-success/page.tsx',
      type: 'page'
    },
    // Pages - Dashboard (Protected)
    {
      sourcePath: 'src/pages/modules/auth-module/dashboard/profile/page.tsx',
      destinationPath: 'src/app/(protected)/dashboard/profile/page.tsx',
      type: 'page'
    },
    {
      sourcePath: 'src/pages/modules/auth-module/dashboard/profile/update-password/page.tsx',
      destinationPath: 'src/app/(protected)/dashboard/profile/update-password/page.tsx',
      type: 'page'
    },
    // API Routes
    {
      sourcePath: 'src/api/modules/auth-module/admin/users/route.ts',
      destinationPath: 'src/app/api/admin/users/route.ts',
      type: 'api'
    },
    // Components - Forms
    {
      sourcePath: 'src/components/modules/auth-module/forms/forgot-password-form.tsx',
      destinationPath: 'src/components/modules/auth-module/forms/forgot-password-form.tsx',
      type: 'component'
    },
    {
      sourcePath: 'src/components/modules/auth-module/forms/login-form.tsx',
      destinationPath: 'src/components/modules/auth-module/forms/login-form.tsx',
      type: 'component'
    },
    {
      sourcePath: 'src/components/modules/auth-module/forms/sign-up-form.tsx',
      destinationPath: 'src/components/modules/auth-module/forms/sign-up-form.tsx',
      type: 'component'
    },
    {
      sourcePath: 'src/components/modules/auth-module/forms/update-password-form.tsx',
      destinationPath: 'src/components/modules/auth-module/forms/update-password-form.tsx',
      type: 'component'
    },
    // Components - Profile
    {
      sourcePath: 'src/components/modules/auth-module/profile/profile-actions.tsx',
      destinationPath: 'src/components/modules/auth-module/profile/profile-actions.tsx',
      type: 'component'
    },
    {
      sourcePath: 'src/components/modules/auth-module/profile/profile-form.tsx',
      destinationPath: 'src/components/modules/auth-module/profile/profile-form.tsx',
      type: 'component'
    },
    {
      sourcePath: 'src/components/modules/auth-module/profile/profile-info.tsx',
      destinationPath: 'src/components/modules/auth-module/profile/profile-info.tsx',
      type: 'component'
    },
    // Hooks
    {
      sourcePath: 'src/hooks/auth-modules/index.ts',
      destinationPath: 'src/hooks/auth-modules/index.ts',
      type: 'util'
    },
    {
      sourcePath: 'src/hooks/auth-modules/useAuth.ts',
      destinationPath: 'src/hooks/auth-modules/useAuth.ts',
      type: 'util'
    },
    {
      sourcePath: 'src/hooks/auth-modules/useForgotPassword.ts',
      destinationPath: 'src/hooks/auth-modules/useForgotPassword.ts',
      type: 'util'
    },
    {
      sourcePath: 'src/hooks/auth-modules/useForgotPasswordForm.ts',
      destinationPath: 'src/hooks/auth-modules/useForgotPasswordForm.ts',
      type: 'util'
    },
    {
      sourcePath: 'src/hooks/auth-modules/useLoginForm.ts',
      destinationPath: 'src/hooks/auth-modules/useLoginForm.ts',
      type: 'util'
    },
    {
      sourcePath: 'src/hooks/auth-modules/useProfile.ts',
      destinationPath: 'src/hooks/auth-modules/useProfile.ts',
      type: 'util'
    },
    {
      sourcePath: 'src/hooks/auth-modules/useProfileForm.ts',
      destinationPath: 'src/hooks/auth-modules/useProfileForm.ts',
      type: 'util'
    },
    {
      sourcePath: 'src/hooks/auth-modules/useSignUp.ts',
      destinationPath: 'src/hooks/auth-modules/useSignUp.ts',
      type: 'util'
    },
    {
      sourcePath: 'src/hooks/auth-modules/useSignUpForm.ts',
      destinationPath: 'src/hooks/auth-modules/useSignUpForm.ts',
      type: 'util'
    },
    {
      sourcePath: 'src/hooks/auth-modules/useUpdatePassword.ts',
      destinationPath: 'src/hooks/auth-modules/useUpdatePassword.ts',
      type: 'util'
    },
    {
      sourcePath: 'src/hooks/auth-modules/useUpdatePasswordForm.ts',
      destinationPath: 'src/hooks/auth-modules/useUpdatePasswordForm.ts',
      type: 'util'
    },
    // Lib - Handlers
    {
      sourcePath: 'src/lib/handlers/auth-module/user/auth.handlers.ts',
      destinationPath: 'src/lib/handlers/auth-module/user/auth.handlers.ts',
      type: 'util'
    },
    {
      sourcePath: 'src/lib/handlers/auth-module/user/index.ts',
      destinationPath: 'src/lib/handlers/auth-module/user/index.ts',
      type: 'util'
    },
    // Lib - Schema
    {
      sourcePath: 'src/lib/schema/auth-module/index.ts',
      destinationPath: 'src/lib/schema/auth-module/index.ts',
      type: 'util'
    },
    {
      sourcePath: 'src/lib/schema/auth-module/user.schema.ts',
      destinationPath: 'src/lib/schema/auth-module/user.schema.ts',
      type: 'util'
    },
    // Lib - Stores
    {
      sourcePath: 'src/lib/stores/auth-module/index.ts',
      destinationPath: 'src/lib/stores/auth-module/index.ts',
      type: 'util'
    },
    {
      sourcePath: 'src/lib/stores/auth-module/useUserStore.ts',
      destinationPath: 'src/lib/stores/auth-module/useUserStore.ts',
      type: 'util'
    },
    // Lib - Supabase Adapters
    {
      sourcePath: 'src/lib/supabase/adapters/server.ts',
      destinationPath: 'src/lib/supabase/adapters/server.ts',
      type: 'util'
    },
    {
      sourcePath: 'src/lib/supabase/adapters/client.ts',
      destinationPath: 'src/lib/supabase/adapters/client.ts',
      type: 'util'
    },
    {
      sourcePath: 'src/lib/supabase/adapters/service-role.ts',
      destinationPath: 'src/lib/supabase/adapters/service-role.ts',
      type: 'util'
    },
    {
      sourcePath: 'src/lib/supabase/adapters/auth-check-middleware.ts',
      destinationPath: 'src/lib/supabase/adapters/auth-check-middleware.ts',
      type: 'util'
    },
    // Lib - Supabase Services
    {
      sourcePath: 'src/lib/supabase/auth-module/services/admin-user.services.ts',
      destinationPath: 'src/lib/supabase/auth-module/services/admin-user.services.ts',
      type: 'util'
    },
    {
      sourcePath: 'src/lib/supabase/auth-module/services/user.services.ts',
      destinationPath: 'src/lib/supabase/auth-module/services/user.services.ts',
      type: 'util'
    },
    // Lib - Utils
    {
      sourcePath: 'src/lib/utils/auth-module/password-strength.ts',
      destinationPath: 'src/lib/utils/auth-module/password-strength.ts',
      type: 'util'
    }
  ],
  schemas: `
-- Auth Module Database Schema
-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  updated_at TIMESTAMP DEFAULT now() NOT NULL
);

-- Create indexes for better performance
CREATE UNIQUE INDEX IF NOT EXISTS users_email_idx ON users(email);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
  `
}; 