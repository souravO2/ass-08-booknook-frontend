// components/EditProfileDialog.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { authClient, useSession } from "@/lib/auth-client";
import { UserAvatar } from "@/components/Navbar/Profile";

const fieldClasses =
  "block h-11 w-full rounded-[10px] border-[1.5px] border-[#CFC3AA] bg-white px-3.5 text-[15px] text-ink outline-none placeholder:text-muted/70 focus-visible:border-forest focus-visible:ring-2 focus-visible:ring-forest/20 read-only:bg-sand/60";

type Props = {
  user: { name: string; email: string; image?: string | null };
  onClose: () => void;
};

export default function EditProfileDialog({ user, onClose }: Props) {
  const router = useRouter();
  const { refetch } = useSession();
  const [name, setName] = React.useState(user.name);
  const [image, setImage] = React.useState(user.image ?? "");
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim(),
      });

      if (error) {
        toast.error(error.message || "Could not update your profile");
        return;
      }

      // Reload the session from the server, skipping the cookie cache,
      // then refresh the page so everything shows the new data
      await authClient.getSession({ query: { disableCookieCache: true } });
      await refetch();
      router.refresh();

      toast.success("Profile updated successfully");
      onClose();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md rounded-[20px] border-border bg-white p-8">
        <DialogHeader>
          <DialogTitle className="font-heading text-3xl font-bold text-ink">
            Edit Profile
          </DialogTitle>
          <DialogDescription className="sr-only">
            Change your name and photo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center gap-4">
            <UserAvatar
              user={{ ...user, name: name || user.name, image: image || null }}
              className="size-16"
            />
            <p className="text-sm text-muted">
              Paste a link to a photo and the preview updates here.
            </p>
          </div>

          <div>
            <label htmlFor="profileName" className="block text-sm font-bold">
              Name
            </label>
            <input
              id="profileName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${fieldClasses} mt-1.5`}
              required
            />
          </div>

          <div>
            <label htmlFor="profileImage" className="block text-sm font-bold">
              Photo URL
            </label>
            <input
              id="profileImage"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className={`${fieldClasses} mt-1.5`}
            />
          </div>

          <div>
            <label htmlFor="profileEmail" className="block text-sm font-bold">
              Email
            </label>
            <input
              id="profileEmail"
              value={user.email}
              readOnly
              className={`${fieldClasses} mt-1.5`}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-12 flex-1 cursor-pointer rounded-full border-[1.5px] border-forest font-bold text-forest transition-colors hover:bg-sand"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-forest font-bold text-white transition-colors hover:bg-forest-deep disabled:opacity-60"
            >
              {submitting && <Loader2 className="size-4 animate-spin" />}
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
