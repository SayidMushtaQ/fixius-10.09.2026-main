"use client";
import { useState } from "react";
import { toast } from "sonner";

const useOnChangeUploadImages = () => {
  const [imageDataPageData, setImagePageData] = useState<string[]>([]);
  const [isImgUploading, setIsImgUploading] = useState<boolean>(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>): Promise<string[] | undefined> => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

    if (!uploadPreset || !cloudName || !cloudinaryUrl) {
      toast.error("Cloudinary-Konfiguration fehlt");
      return;
    }

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} ist zu groß (max. 5MB)`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setIsImgUploading(true);

    try {
      const uploadPromises = validFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        formData.append("cloud_name", cloudName);

        const response = await fetch(cloudinaryUrl, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error(`Upload fehlgeschlagen: ${file.name}`);
        
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        
        return data.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setImagePageData(prev => [...prev, ...uploadedUrls]);
      toast.success(`${uploadedUrls.length} Bilder erfolgreich hochgeladen`);
      return uploadedUrls;
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Fehler beim Hochladen der Bilder");
    } finally {
      setIsImgUploading(false);
      // Reset input value to allow uploading the same file again
      event.target.value = "";
    }
  };

  return {
    isImgUploading,
    imagesData: imageDataPageData,
    setImagePageData,
    handleImageUpload,
  };
};

export default useOnChangeUploadImages;
