import { ProfileInfo } from "@/components/modules/auth-module/profile/profile-info";
import { ProfileForm } from "@/components/modules/auth-module/profile/profile-form";
import { ProfileActions } from "@/components/modules/auth-module/profile/profile-actions";

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Profile Management</h1>
        <p className="text-muted-foreground">
          Manage your account settings and personal information.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProfileForm />
        </div>
        
        <div className="space-y-6">
          <ProfileInfo />
          <ProfileActions />
        </div>
      </div>
    </div>
  );
}
