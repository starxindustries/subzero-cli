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
import { LoadingSpinner } from "@/components/ui/loading-bar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSignUpForm } from "@/hooks/auth-modules";

export function SignUpForm({
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
  } = useSignUpForm();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    updateField("email", e.target.value);
                    if (error) clearError();
                  }}
                  className={cn(
                    fieldErrors.email && "border-red-500 focus-visible:ring-red-500"
                  )}
                  disabled={isLoading}
                />
                {fieldErrors.email && (
                  <p className="text-sm text-red-500">{fieldErrors.email}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter a strong password"
                  required
                  value={formData.password}
                  onChange={(e) => {
                    updateField("password", e.target.value);
                    if (error) clearError();
                  }}
                  className={cn(
                    fieldErrors.password && "border-red-500 focus-visible:ring-red-500"
                  )}
                  disabled={isLoading}
                />
                {fieldErrors.password && (
                  <p className="text-sm text-red-500">{fieldErrors.password}</p>
                )}

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Password Strength:</span>
                      <Badge
                        variant={passwordStrength.score >= 3 ? "default" : "secondary"}
                        className={cn(
                          "text-xs",
                          passwordStrength.score === 0 && "bg-red-100 text-red-700 hover:bg-red-100",
                          passwordStrength.score === 1 && "bg-red-50 text-red-600 hover:bg-red-50",
                          passwordStrength.score === 2 && "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
                          passwordStrength.score === 3 && "bg-blue-100 text-blue-700 hover:bg-blue-100",
                          passwordStrength.score === 4 && "bg-green-100 text-green-700 hover:bg-green-100"
                        )}
                      >
                        {getPasswordStrengthLabel(passwordStrength.score)}
                      </Badge>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={cn(
                          "h-2 rounded-full transition-all duration-300",
                          passwordStrength.score === 0 && "bg-red-500",
                          passwordStrength.score === 1 && "bg-red-400",
                          passwordStrength.score === 2 && "bg-yellow-500",
                          passwordStrength.score === 3 && "bg-blue-500",
                          passwordStrength.score === 4 && "bg-green-500"
                        )}
                        style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                      />
                    </div>

                    {/* Requirements List */}
                    {passwordStrength.feedback.length > 0 && (
                      <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-md">
                        <p className="font-medium mb-2">Password must contain:</p>
                        <ul className="space-y-1">
                          {passwordStrength.feedback.map((requirement, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <span className="w-1 h-1 bg-muted-foreground rounded-full flex-shrink-0" />
                              <span>{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* All requirements met */}
                    {passwordStrength.feedback.length === 0 && passwordStrength.score >= 3 && (
                      <div className="flex items-center space-x-2 text-xs text-green-600 bg-green-50 p-2 rounded-md">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>All password requirements met</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    updateField("confirmPassword", e.target.value);
                    if (error) clearError();
                  }}
                  className={cn(
                    fieldErrors.confirmPassword && "border-red-500 focus-visible:ring-red-500"
                  )}
                  disabled={isLoading}
                />
                {fieldErrors.confirmPassword && (
                  <p className="text-sm text-red-500">{fieldErrors.confirmPassword}</p>
                )}

                {/* Password Match Indicator */}
                {formData.confirmPassword && formData.password && (
                  <div className="flex items-center space-x-2 text-xs">
                    {formData.password === formData.confirmPassword ? (
                      <div className="flex items-center space-x-1 text-green-600">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Passwords match</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-red-500">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span>Passwords do not match</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {error && error !== "Auth session missing!" && (
                <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md border border-red-200 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="w-full"
                disabled={
                  isLoading ||
                  !formData.email ||
                  !formData.password ||
                  !formData.confirmPassword ||
                  formData.password !== formData.confirmPassword ||
                  passwordStrength.score < 3
                }
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    Creating account...
                  </div>
                ) : (
                  "Create account"
                )}
              </Button>

              {/* Submit Requirements */}
              {(!formData.email || !formData.password || !formData.confirmPassword) && (
                <p className="text-xs text-muted-foreground text-center">
                  Please fill in all required fields
                </p>
              )}
              {formData.email && formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-red-500 text-center">
                  Passwords must match to continue
                </p>
              )}
              {formData.email && formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && passwordStrength.score < 3 && (
                <p className="text-xs text-amber-600 text-center">
                  Password must be stronger to create account
                </p>
              )}
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
