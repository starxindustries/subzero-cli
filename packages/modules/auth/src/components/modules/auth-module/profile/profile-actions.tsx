"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth-modules";

export function ProfileActions() {
    const { logout, isLogoutLoading } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <h4 className="text-sm font-medium">Security</h4>
                    <p className="text-xs text-muted-foreground">
                        Manage your account security and access.
                    </p>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => window.location.href = '/dashboard/profile/update-password'}
                    >
                        Change Password
                    </Button>
                </div>

                <div className="space-y-2">
                    <h4 className="text-sm font-medium">Session</h4>
                    <p className="text-xs text-muted-foreground">
                        Sign out of your account on this device.
                    </p>
                    <Button
                        variant="destructive"
                        className="w-full"
                        onClick={handleLogout}
                        disabled={isLogoutLoading}
                    >
                        {isLogoutLoading ? "Signing out..." : "Sign Out"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
} 