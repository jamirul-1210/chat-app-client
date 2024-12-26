"use client";
import { useAppDispatch, useAppSelector } from "@/redux-store/hooks";
import { UserAvatar } from "./user-avatar";
import { UserInfo } from "./user-info";
import { UserMenu } from "./user-menu";
import { useState } from "react";
import { UpdateProfileImageModal } from "../update-profile/update-profile-image-modal";
import {
  AUTH_TOKEN_KEY_NAME,
  AUTH_USER_KEY_NAME,
  BACKEND_BASE_URL,
} from "@/lib/constants";
import { removeUser } from "@/redux-store/features/auth-slice";
import { useRouter } from "next/navigation";
import axios from "axios";

export function UserProfileBar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleUpdateImage = async (image: File) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
    if (!token) return;
    const formData = new FormData();
    formData.append("photo", image);
    return await axios.post(`${BACKEND_BASE_URL}/api/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const handleLogout = () => {
    // remove from auth token localStorage
    localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
    localStorage.removeItem(AUTH_USER_KEY_NAME);
    //remove from global redux state
    dispatch(removeUser());
    router.push("/login");
  };

  return (
    <>
      <div className="border-t border-border p-4 bg-card mt-auto">
        <div className="flex items-center gap-3">
          <UserAvatar
            imageUrl={authState.user?.imagrUrl}
            name={authState.user?.name}
          />
          <UserInfo
            name={authState.user?.name}
            userName={authState.user?.userName}
          />
          <UserMenu
            onLogout={handleLogout}
            onUpdateImage={() => setIsImageModalOpen(true)}
          />
        </div>
      </div>
      <UpdateProfileImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onUpdate={handleUpdateImage}
      />
    </>
  );
}
