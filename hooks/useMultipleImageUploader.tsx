"use client";
import React, { ChangeEvent, useState, useRef, useEffect } from "react";
import { toast } from "sonner";

interface ImageUploaderResult {
  selectedFiles: File[];
  base64Images: { file: File; base64: string }[];
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleUploadImages: Function;
  handleOpenWidget: (onSuccess: (result: any) => void) => void;
  isUploading: boolean;
  uploadedImages: string[];
  setBase64Images: React.Dispatch<
    React.SetStateAction<{ file: File; base64: string }[]>
  >;
}

const useImageUploader = (): ImageUploaderResult => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [base64Images, setBase64Images] = useState<
    { file: File; base64: string }[]
  >([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    // Poll for Cloudinary widget availability
    const checkWidget = setInterval(() => {
      if (typeof (window as any).cloudinary?.createUploadWidget === 'function') {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

        if (cloudName && uploadPreset) {
          widgetRef.current = (window as any).cloudinary.createUploadWidget(
            {
              cloudName,
              uploadPreset,
              sources: ["local", "camera", "url"],
              multiple: true,
              cropping: false,
              styles: {
                palette: {
                  window: "#FFFFFF",
                  windowBorder: "#90A0B3",
                  tabIcon: "#FF6B00",
                  menuIcons: "#5A616A",
                  textDark: "#000000",
                  textLight: "#FFFFFF",
                  link: "#FF6B00",
                  action: "#FF6B00",
                  inactiveTabIcon: "#0E2F5A",
                  error: "#F44235",
                  inProgress: "#FF6B00",
                  complete: "#20B832",
                  sourceBg: "#E4EBF1"
                },
                fonts: {
                  default: null,
                  "'Outfit', sans-serif": {
                    url: "https://fonts.googleapis.com/css?family=Outfit",
                    active: true
                  }
                }
              }
            },
            (error: any, result: any) => {
              if (!error && result && result.event === "success") {
                // handle success elsewhere or via callback
              }
            }
          );
          clearInterval(checkWidget);
        }
      }
    }, 100);

    return () => clearInterval(checkWidget);
  }, []);

  const handleOpenWidget = (onSuccess: (result: any) => void) => {
    if (widgetRef.current) {
      widgetRef.current.update({
        // Optional: override callback for this specific call
      });
      
      // We re-create or update the callback logic here if needed, 
      // but simpler to just use a ref for the latest callback
      (window as any).cloudinary.createUploadWidget(
        widgetRef.current.options,
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            onSuccess(result.info);
          }
        }
      ).open();
    } else {
      toast.error("Upload Widget wird noch geladen...");
    }
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const newFiles: File[] = Array.from(files);
      setSelectedFiles([...selectedFiles, ...newFiles]);

      const promises: Promise<{ file: File; base64: string }>[] = newFiles.map(
        (file) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve({ file, base64: reader.result as string });
            };
            reader.readAsDataURL(file);
          });
        }
      );

      Promise.all(promises).then((base64Array) => {
        setBase64Images([...base64Images, ...base64Array]);
      });
    }
  };

  const handleUploadImages = async (files: FileList | []) => {
    if (!files || files.length === 0) {
      return null;
    }

    setIsUploading(true);

    const toastId = toast.loading("Wird hochgeladen …");
    const uploadedImages: string[] = [];
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageFormData = new FormData();
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
		const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

        if (!uploadPreset || !cloudName || !cloudinaryUrl) {
          throw new Error("Cloudinary configuration is missing");
        }

        // Append each file with the name "file"
        imageFormData.append("file", file);
        imageFormData.append("upload_preset", uploadPreset);
        imageFormData.append("cloud_name", cloudName);

        const response = await fetch(cloudinaryUrl, {
          method: "POST",
          body: imageFormData,
        });

        const data = await response.json();

        if (data.error) {
          toast.error(data?.error?.message);
          setIsUploading(false);
          return null;
        }

        const imageUrl = data.secure_url;
        uploadedImages.push(imageUrl);
      }

      setUploadedImages(uploadedImages);
      setIsUploading(false);
      toast.dismiss(toastId);
      setBase64Images([]);
      return uploadedImages;
    } catch (error) {
      console.error(error);
      toast.error("Fehler beim Hochladen der Bilder. Bitte versuchen Sie es erneut");
      setIsUploading(false);
      toast.dismiss(toastId);
      return null;
    }
  };

  return {
    selectedFiles,
    base64Images,
    handleFileChange,
    handleUploadImages,
    handleOpenWidget,
    isUploading,
    uploadedImages,
    setBase64Images,
  };
};

export default useImageUploader;
