"use client";
import React, { useState } from "react";
import Image from "next/image";
import userImage from "@/assets/cleaner-placeholder.png";
import { MailIcon, Phone } from "lucide-react";
import LocationIcon from "@/components/icons/LocationIcon";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { User } from "../../_utils/types";
import { useUpdateProfileMutation } from "../../_services/mutations";
import { BasicConfirmationModal } from "../../_components/BasicConfirmationModal";

export default function ProfileSection2({ user }: { user: User }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="p-6 border border-surface-500/30 rounded-lg flex flex-col gap-16">
        <div className="w-full items-center flex flex-col">
          <Image
            className="rounded-full size-25"
            src={userImage}
            alt={"user profile"}
          />
          <div className="flex items-center flex-col">
            <h1 className="font-medium text-2xl text-secondary-700">
              {user.personalInformation?.fullName}
            </h1>
            <p className="text-surface-500 text-body text-xs">
              Joined since {new Date(user.createdAt).getFullYear()}
            </p>
          </div>
        </div>
        <div className="flex gap-4 text-surface-500 *:items-center *:flex *:gap-2 flex-col">
          <div>
            <MailIcon className="size-5" />
            <p>{user.email}</p>
          </div>
          <div>
            <Phone className="size-5" />
            <p>{user.personalInformation.phoneNumber}</p>
          </div>
          <div>
            <LocationIcon className="size-5" />
            <p>{user.personalInformation.address}</p>
          </div>
        </div>
      </div>
      <PersonalInfoForm user={user} />
    </section>
  );
}

function PersonalInfoForm({ user }: { user: User }) {
  const [formData, setFormData] = useState({
    fullName: user.personalInformation?.fullName,
    email: user.email,
    phone: user.personalInformation?.phoneNumber,
    address: user.personalInformation?.address,
    yearJoined: new Date(user.createdAt).getFullYear()
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { mutateAsync: updateProfile, isPending: isUpdating } =
    useUpdateProfileMutation();

  function handleOnchange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  }

  async function handleSaveChanges() {
    await updateProfile({
      userId: String(user.id),
      fullName: formData.fullName,
      phoneNumber: formData.phone,
      address: formData.address
    });
    setShowConfirmModal(false);
  }

  return (
    <>
      <div className="p-6 border border-surface-500/30 rounded-lg flex flex-col justify-between gap-8">
        <div>
          <h1 className="font-medium text-2xl text-secondary-700">
            Personal Information
          </h1>
          <p className="text-surface-500 text-body">
            update your personal details
          </p>
        </div>
        <form className="flex *:flex *:flex-col *:gap-2 text-secondary-700 flex-col gap-3">
          <label>
            Fullname
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleOnchange}
            />
          </label>
          <label>
            Email
            <Input
              name="email"
              value={formData.email}
              onChange={handleOnchange}
              disabled
            />
          </label>
          <label>
            Phone
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleOnchange}
            />
          </label>
          <label>
            Address
            <Input
              name="address"
              value={formData.address}
              onChange={handleOnchange}
            />
          </label>
          <Button
            disabled={isUpdating}
            onClick={(e) => {
              e.preventDefault();
              setShowConfirmModal(true);
            }}
            size={"xs"}
            className="hover:border-secondary-700 my-3 hover:text-secondary-700 w-full text-caption flex justify-center gap-3 bg-secondary-700 text-white"
          >
            Save Changes
          </Button>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <BasicConfirmationModal
          setShowConfirmModal={setShowConfirmModal}
          isUpdating={isUpdating}
          handleSaveChanges={handleSaveChanges}
          title="Confirm Changes"
          message="Are you sure you want to save these changes to your profile?"
        />
      )}
    </>
  );
}
