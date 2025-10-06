import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudinary.config";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: {
    public_id: (req, file) => {
      const originalName = file.originalname;

      const nameWithoutExt =
        originalName.substring(0, originalName.lastIndexOf(".")) ||
        originalName;

      const extension = originalName.split(".").pop()?.toLowerCase() || "file";

      const fileName =
        nameWithoutExt
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/\.+/g, "-")
          .replace(/[^a-z0-9-_]/g, "")
          .replace(/-+/g, "-")
          .replace(/^[-_]+|[-_]+$/g, "")
          .slice(0, 50) || "file";

      const uniqueFileName =
        Math.random().toString(36).substring(2) +
        "-" +
        Date.now() +
        "-" +
        fileName +
        "." +
        extension;

      return uniqueFileName;
    },
  },
});

export const multerUpload = multer({ storage: storage });
