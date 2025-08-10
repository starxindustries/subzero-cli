"use client";

import { cn, getPasswordStrengthLabel, getPasswordStrengthColor } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdatePasswordForm } from "@/hooks/auth-modules";

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    formData,
    fieldErrors,
    isLoading,
    error,
    passwordStrength,
    updateField,
    handleSubmit,
    clearError,
    clearFieldError,
  } = useUpdatePasswordForm();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Reset Your Password</CardTitle>
          <CardDescription>
            Please enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">New password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="New password"
                  required
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                />
                {fieldErrors.password && (
                  <p className="text-sm text-red-500">{fieldErrors.password}</p>
                )}
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Password Strength:</span>
                      <span className={cn("text-sm font-medium", getPasswordStrengthColor(passwordStrength.score))}>
                        {getPasswordStrengthLabel(passwordStrength.score)}
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={cn(
                          "h-2 rounded-full transition-all duration-300",
                          passwordStrength.score === 0 && "bg-red-600",
                          passwordStrength.score === 1 && "bg-red-500",
                          passwordStrength.score === 2 && "bg-yellow-500",
                          passwordStrength.score === 3 && "bg-blue-500",
                          passwordStrength.score === 4 && "bg-green-500"
                        )}
                        style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                      />
                    </div>
                    
                    {/* Requirements List */}
                    {passwordStrength.feedback.length > 0 && (
                      <div className="text-xs text-gray-600">
                        <p className="font-medium mb-1">Password must contain:</p>
                        <ul className="space-y-0.5">
                          {passwordStrength.feedback.map((requirement, index) => (
                            <li key={index} className="flex items-center space-x-1">
                              <span className="text-red-500">•</span>
                              <span>{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* All requirements met */}
                    {passwordStrength.feedback.length === 0 && passwordStrength.score >= 3 && (
                      <p className="text-xs text-green-600">✓ All password requirements met</p>
                    )}
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm new password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => updateField("confirmPassword", e.target.value)}
                />
                {fieldErrors.confirmPassword && (
                  <p className="text-sm text-red-500">{fieldErrors.confirmPassword}</p>
                )}
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save new password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
