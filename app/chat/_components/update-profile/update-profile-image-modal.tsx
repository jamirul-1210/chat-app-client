"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "./image-uploader";
import { useAppDispatch } from "@/redux-store/hooks";
import { setUserImage } from "@/redux-store/features/auth-slice";
import { AUTH_USER_KEY_NAME } from "@/lib/constants";
import { User } from "@/interfaces/user";

interface UpdateProfileImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (image: File) => Promise<any>;
}

export function UpdateProfileImageModal({
  isOpen,
  onClose,
  onUpdate,
}: UpdateProfileImageModalProps) {
  const [selectedImage, setSelectedImage] = useState<File>();
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useAppDispatch();

  const handleUpdate = async () => {
    if (selectedImage) {
      setIsUpdating(true);
      try {
        const res = await onUpdate(selectedImage);
        // update stored user 
        if(res.status === 200){
          const storedUser = localStorage.getItem(AUTH_USER_KEY_NAME);
          if(storedUser){
            const user = JSON.parse(storedUser) as User;
            user.imagrUrl = res.data.file
            localStorage.setItem(AUTH_USER_KEY_NAME,JSON.stringify(user));
          }
          // update state
          dispatch(setUserImage(res.data.file))
        }
        onClose();
      } catch (error) {
        console.error("Failed to update profile image:", error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Profile Image</DialogTitle>
          <DialogDescription>Upload a new image</DialogDescription>
        </DialogHeader>

        <ImageUploader onImageSelect={setSelectedImage} />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={!selectedImage || isUpdating}
          >
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
