"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/hooks/auth-modules";
import type { UserProfile } from "@/lib/supabase/auth-module/services/user.services";

export function ProfileInfo() {
  const { getProfile } = useProfile();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await getProfile();
      if (profile) {
        setUserProfile(profile);
      }
    };
    
    loadProfile();
  }, [getProfile]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Email:</span>
          <span className="text-sm text-muted-foreground">{userProfile?.email || "Not provided"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status:</span>
          <Badge variant={userProfile?.email_verified ? "default" : "secondary"}>
            {userProfile?.email_verified ? "Verified" : "Unverified"}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Role:</span>
          <Badge variant="outline">
            {userProfile?.role || "User"}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Member since:</span>
          <span className="text-sm text-muted-foreground">
            {userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString() : "Unknown"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Last sign in:</span>
          <span className="text-sm text-muted-foreground">
            {userProfile?.last_login_at ? new Date(userProfile.last_login_at).toLocaleDateString() : "Unknown"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Account Status:</span>
          <Badge variant={userProfile?.status === "active" ? "default" : "destructive"}>
            {userProfile?.status || "Unknown"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
} 