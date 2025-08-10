"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfileForm } from "@/hooks/auth-modules";
import { useUserStore } from "@/lib/stores/auth-module";

export function ProfileForm() {
    const {
        formData,
        fieldErrors,
        isLoading,
        error,
        updateField,
        handleSubmit,
        clearError,
        clearFieldError,
        loadProfile,
    } = useProfileForm();

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                type="text"
                                placeholder="John"
                                required
                                value={formData.firstName}
                                onChange={(e) => updateField("firstName", e.target.value)}
                            />
                            {fieldErrors.firstName && (
                                <p className="text-sm text-red-500">{fieldErrors.firstName}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                type="text"
                                placeholder="Doe"
                                required
                                value={formData.lastName}
                                onChange={(e) => updateField("lastName", e.target.value)}
                            />
                            {fieldErrors.lastName && (
                                <p className="text-sm text-red-500">{fieldErrors.lastName}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            disabled={true}
                            value={useUserStore.getState().user?.email}
                        // onChange={(e) => updateField("email", e.target.value)}
                        />
                        <div className="text-xs text-muted-foreground">You cannot change your email address</div>
                        {fieldErrors.email && (
                            <p className="text-sm text-red-500">{fieldErrors.email}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (234) 567-8900"
                            value={formData.phone || ""}
                            onChange={(e) => updateField("phone", e.target.value)}
                        />
                        {fieldErrors.phone && (
                            <p className="text-sm text-red-500">{fieldErrors.phone}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                            Enter 10-15 digits. You can use spaces, dashes, parentheses, and plus sign.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio (Optional)</Label>
                        <textarea
                            id="bio"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Tell us about yourself..."
                            value={formData.bio || ""}
                            onChange={(e) => updateField("bio", e.target.value)}
                            maxLength={500}
                        />
                        {fieldErrors.bio && (
                            <p className="text-sm text-red-500">{fieldErrors.bio}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                            {(formData.bio || "").length}/500 characters
                        </p>
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
} 