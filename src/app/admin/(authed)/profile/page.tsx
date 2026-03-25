"use client";

import React, { useState } from "react";
import { useGetUserProfile } from "@/app/dashboard/_services/queries";
import { useUpdatePasswordMutation } from "@/app/dashboard/_services/mutations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { data: profile, isLoading } = useGetUserProfile();
  const { mutateAsync: updatePassword, isPending } =
    useUpdatePasswordMutation();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!profile?.id) {
      setError("User profile not fully loaded yet. Please refresh.");
      return;
    }

    try {
      await updatePassword({
        userId: profile.id.toString(),
        oldPassword,
        newPassword
      });
      setSuccess(true);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      console.error(err);
      setError(
        (
          err as {
            response?: { data?: { message?: string } };
            message?: string;
          }
        ).response?.data?.message ||
          (err as { message?: string }).message ||
          "Failed to update password."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-500">Failed to load profile data.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 md:px-8 space-y-6">
      <h1 className="text-heading-4 font-semibold text-secondary-700">
        Profile Settings
      </h1>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-custom">
        <h2 className="text-xl font-medium mb-6 text-secondary-700 border-b pb-2">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-500 block mb-1">
              Full Name
            </label>
            <p className="font-medium text-lg text-secondary-900 capitalize">
              {profile.personalInformation?.fullName || "Not provided"}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">
              Email Address
            </label>
            <p className="font-medium text-lg text-secondary-900">
              {profile.email}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">
              Phone Number
            </label>
            <p className="font-medium text-lg text-secondary-900">
              {profile.personalInformation?.phoneNumber || "Not provided"}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">Role</label>
            <p className="font-medium text-lg text-secondary-900 capitalize">
              {profile.role.toLowerCase()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-custom">
        <h2 className="text-xl font-medium mb-6 text-secondary-700 border-b pb-2">
          Update Password
        </h2>

        {success && (
          <div className="p-4 mb-6 text-sm text-success-700 bg-success-50 rounded-lg border border-success-200">
            Your password was updated successfully.
          </div>
        )}

        {error && (
          <div className="p-4 mb-6 text-sm text-error bg-error/10 rounded-lg border border-error/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
          <Input
            label="Current Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            placeholder="Enter current password"
          />
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder="Min. 6 characters"
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Re-enter new password"
          />
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full md:w-auto"
            >
              {isPending ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </span>
              ) : (
                "Update Password"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
